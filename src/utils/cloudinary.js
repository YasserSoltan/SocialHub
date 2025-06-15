// utils/cloudinary.js
export const uploadToCloudinary = async (file, cloudinaryPreset) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryPreset); // Replace with your Cloudinary preset
  formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME); // Replace with your Cloudinary cloud name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, // Replace with your cloud name
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};