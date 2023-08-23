"use client";

import {
  PhotoIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MultipleSelect from "@/components/multiSelect";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import uploadImageToCloudinary from "@/utils/uploadImageToCD";
import axios from "axios";
import AlertDialog from "@/components/alertDialog";
import Loader from "@/components/Loader";
interface FormData {
  title: string;
  tags: string[];
  imageUrl: any;
  description: string;
  userId: string;
}

const SubmitNews = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    tags: [],
    imageUrl: "",
    description: "",
    userId: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [file, setFile] = useState<File | undefined | null>(undefined);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/signin");
      } else {
        setFormData((prevData): any => ({
          ...prevData,
          userId: session.user?.id,
        }));
        setIsPageLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleResetForm = () => {
    setFormData({
      title: "",
      tags: [],
      imageUrl: "",
      description: "",
      userId: formData.userId,
    });
  };
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store uploaded image URL
  const [tagsError, setTagsError] = useState(false);

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagsChange = (selectedItems: { value: string }[]) => {
    const selectedTags = selectedItems.map((item) => item.value);
    setFormData((prevData) => ({ ...prevData, tags: selectedTags }));
    setTagsError(selectedTags.length === 0);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    console.log("file----->", selectedFile);
    setFile(selectedFile); // Update the file state with the selected file

    if (selectedFile) {
      // Check if the selected file is an image (PNG, JPG, GIF)
      const acceptedImageTypes = ["image/png", "image/jpeg", "image/gif"];
      if (acceptedImageTypes.includes(selectedFile.type)) {
        // Show loader while uploading
        setIsLoading(true);

        // Simulate image upload delay (replace this with your actual image upload logic)
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // Set the uploaded image URL and stop loader
        setIsLoading(false);
        const imageURL = URL.createObjectURL(selectedFile);
        setUploadedImage(imageURL);
        // setFormData((prevData) => ({ ...prevData, imageUrl: imageURL }));
      } else {
        // Selected file is not an image, show an error message or handle it as needed
        console.error("Please select an image (PNG, JPG, GIF) file.");
      }
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!file) return null;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "dhh-news");
      data.append("cloud_name", "dexfnfjrx");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dexfnfjrx/image/upload`,
        data
      );

      return response.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.tags.length === 0) {
      setTagsError(true);
      return; // Stop form submission
    }
    try {
      const imageUrl = await uploadImageToCloudinary();

      const newsData = {
        ...formData,
        imageUrl: imageUrl || formData.imageUrl, // Use existing imageUrl if no new image
      };

      const newsResponse = await fetch("/api/submit-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (newsResponse.ok) {
        setModalMessage(
          "News Submitted successfully. Please wait for approval."
        );
        setModalVisible(true);
        handleResetForm();
        // router.push("/signin")
      } else {
        setModalMessage("Something went wrong!");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setModalMessage("Something went wrong!");
      setModalVisible(true);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setFile(null);
  };

  if (isPageLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-lg font-semibold leading-7 text-gray-900"
              >
                Title
              </label>
              <div className={`mt-2 ${tagsError ? "border-[#FF6D00]" : ""}`}>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset  ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#FF6D00] w-full">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                    placeholder="EPR Iyer started a math tuition class and only teaches Fibonacci series!"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="tags"
                className="block text-lg font-semibold leading-6 text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2">
                <MultipleSelect
                  required
                  className="outline-none"
                  onChange={handleTagsChange}
                />
                {tagsError && (
                  <p className="text-[#FF6D00] mt-1">
                    Please select at least one tag.
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-lg font-semibold leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {isLoading ? (
                  // Show loader if image is being uploaded
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FFB600] border-solid mx-auto"></div>
                    <p className="mt-4 text-base leading-6 text-gray-600">
                      Uploading...
                    </p>
                  </div>
                ) : uploadedImage ? (
                  // Show the uploaded image if available
                  // <img src={uploadedImage} alt="Uploaded" className="h-32 mx-auto" />
                  <div className="relative w-44">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-full w-full rounded"
                    />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="absolute top-0 right-0 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
                    >
                      <XMarkIcon className="h-5 w-5 text-[#FF6D00]" />
                    </button>
                  </div>
                ) : (
                  // Show the file input for selecting an image
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-base leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-[#FF6D00] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#FF6D00] focus-within:ring-offset-2 hover:text-[#FFB600]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-2">or drag and drop</p>
                    </div>
                    <p className="text-base leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-lg font-semibold leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  required
                  id="description"
                  name="description"
                  rows={5}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset border-hidden ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-base sm:leading-6"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-lg font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#FF6D00] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#FFB600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6D00]"
        >
          Save
        </button>
      </div>
      {modalVisible && (
        <AlertDialog
          modalMessage={modalMessage}
          setModalVisible={setModalVisible}
        />
      )}
    </form>
  );
};

export default SubmitNews;
