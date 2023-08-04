import axios from "axios";

export default async function uploadImageToCloudinary(imageUrl:any) {
  const data = new FormData();
  data.append("file", imageUrl);
  data.append("upload_preset", "dhh-news");
  data.append("cloud_name", "dexfnfjrx");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dexfnfjrx/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const responseData = await response.json();
  console.log("res---data--->", responseData.url);
  return responseData.url;
}

// export default async function uploadImageToCloudinary(imageUrl) {
//   const cloudName = process.env.CD_CLOUD_NAME;
//   const uploadPreset = process.env.CD_PRESET_KEY;
//   const file = imageUrl;
//   const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'uploadPreset');
//   // Replace 'your_cloud_name', 'your_upload_preset' with your actual Cloudinary credentials
//   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
//   // const uploadPreset = "your_upload_preset";

//   // Perform the image upload to Cloudinary
//   const response = await axios.post(cloudinaryUrl, {
//     file: imageUrl,
//     upload_preset: uploadPreset,

//   });

//   console.log("response ---->", response);

//   // The uploaded image URL in Cloudinary will be available in the response
//   const uploadedImage = response.data.secure_url;
//   return uploadedImage;
//   const data = new FormData();
//   data.append("file", imageUrl);
//   data.append("upload_preset", "dhh-news");
//   data.append("cloud_name", "dexfnfjrx");
//   fetch(`https://api.cloudinary.com/v1_1/dexfnfjrx/image/upload`, {
//     method: "POST",
//     body: data,
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("res---data--->", data.url);
//       return data.url;
//     });
//   console.log("response", response.json());
//   return response.json();
// }

// export default async function uploadImageToCloudinary(imageUrl: string) {
//   const cloudName = process.env.CD_CLOUD_NAME;
//   const uploadPreset = process.env.CD_PRESET_KEY;
//   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//   console.log("imageUrl ---->", imageUrl, cloudinaryUrl);

//   // Perform the image upload to Cloudinary using fetch
//   const response = await fetch(cloudinaryUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       file: imageUrl,
//       upload_preset: uploadPreset,
//     }),
//   });

//   // Check if the request was successful (status code between 200 and 299)
//   if (!response.ok) {
//     throw new Error("Failed to upload image to Cloudinary");
//   }

//   // Parse the response data as JSON
//   const responseData = await response.json();

//   console.log("response ---->", responseData);

//   // The uploaded image URL in Cloudinary will be available in the response
//   const uploadedImage = responseData.secure_url;
//   return uploadedImage;
// }
