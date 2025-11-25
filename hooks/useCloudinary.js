// hooks/useCloudinary.js
import { useState } from "react";

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false);

  // Hardcoded for your provided values
  const CLOUD_NAME = "igeekmart";
  const UPLOAD_PRESET = "cadema";

  const uploadToCloudinary = async (imageUri, folder = "cadema/products") => {
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: `image_${Date.now()}.jpg`,
      });

      // Correct key for upload preset
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);
      formData.append("quality", "auto");
      formData.append("fetch_format", "auto");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (
    imageUris,
    folder = "cadema/products"
  ) => {
    setUploading(true);

    try {
      const uploadPromises = imageUris.map((uri) =>
        uploadToCloudinary(uri, folder)
      );
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error("Multiple upload error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadToCloudinary,
    uploadMultipleImages,
    uploading,
  };
};
