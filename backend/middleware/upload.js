import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "healplanet/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // ✅ 15MB
  },
});

export default upload;
