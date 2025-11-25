// lib/cloudinary.js
import { Cloudinary } from "cloudinary-react-native";

// Configure Cloudinary
export const cloudinary = Cloudinary.fromUrl(
  "cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
);

// Or configure with individual parameters
export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: "dtxr92piy",
    api_key: "796124584444511",
    api_secret: "cZxq83e0KLtnbCoIam8KtTHiJ-E",
  });
};
