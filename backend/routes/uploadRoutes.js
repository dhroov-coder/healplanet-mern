import express from "express";
import upload from "../middleware/upload.js";
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
          message: "No images uploaded",
        });
      }

      // 🔥 multer-storage-cloudinary already uploaded
      const urls = req.files.map(file => file.path);

      return res.json({
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
