import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

// ✅ CloudinaryStorage auto upload karta hai
router.post(
  "/upload-images",
  adminAuth,
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || !req.files.length) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded",
        });
      }

      // 🔥 DIRECT URLs
      const urls = req.files.map((file) => file.path);

      res.json({
        success: true,
        urls,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  }
);

export default router;
