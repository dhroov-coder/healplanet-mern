import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/upload-images",
  adminAuth,
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images received",
        });
      }

      const urls = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "healplanet/products" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          ).end(file.buffer);
        });

        urls.push(result.secure_url);
      }

      res.json({
        success: true,
        urls,
      });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  }
);

export default router;
