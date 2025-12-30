import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post(
  "/upload-images",
  adminAuth,
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files received",
        });
      }

      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "healplanet/products",
                resource_type: "image",
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            )
            .end(file.buffer);
        });
      });

      const urls = await Promise.all(uploadPromises);

      res.json({
        success: true,
        urls,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  }
);

export default router;
