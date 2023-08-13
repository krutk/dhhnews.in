import {
  PhotoIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";

interface ProfileData {
  profilePicture: string;
  about: string;
  userId: string;
}

const UpdateProfile = (): any => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePicture: "",
    about: "",
    userId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [file, setFile] = useState<File | undefined | null>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/signin");
      } else {
        setProfileData((prevData): any => ({
          ...prevData,
          userId: session.user?.id,
        }));
        setIsPageLoading(false);
      }
    };

    fetchSession();
  }, []);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store uploaded image URL

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
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
      } else {
        // Selected file is not an image, show an error message or handle it as needed
        console.error("Please select an image (PNG, JPG, GIF) file.");
      }
    }
  };

  const updateProfilePicture = async () => {
    if (!file) return null;

    try {
      const data: any = new FormData();
      data.append("file", file);
      data.append("upload_preset", process.env.CD_PRESET_KEY);
      data.append("cloud_name", process.env.CD_CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CD_CLOUD_NAME}/image/upload`,
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

    try {
      const profilePicture = await updateProfilePicture();

      const updatedProfileData = {
        ...profileData,
        profilePicture: profilePicture || profileData.profilePicture, // Use existing profilePicture if no new image
      };

      // Perform the update API call with updatedProfileData
      const updateProfileResponse = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileData),
      });

      console.log("updatedProfileResponse: " + updateProfileResponse);

      if (updateProfileResponse.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong!");
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
      {/* ...Similar code as the previous example... */}
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="profile-picture"
                className="block text-lg font-semibold leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {isLoading ? (
                  // Show loader if image is being uploaded
                  <Loader />
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
                htmlFor="about"
                className="block text-lg font-semibold leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset border-hidden ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-base sm:leading-6"
                  placeholder="Tell us about yourself..."
                  value={profileData.about}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-[#FF6D00] px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#FFB600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6D00]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
