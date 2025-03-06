export const uploadToCloudinary = async (file) => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  console.log("Cloudinary Cloud Name:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log("Upload Preset:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);


  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.error("Missing Cloudinary config");
    throw new Error("Cloudinary configuration is missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data.secure_url; // Return the uploaded file URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Upload failed");
  }
};
