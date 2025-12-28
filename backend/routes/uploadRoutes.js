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
        return res.status(400).json({ success: false });
      }

      const urls = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "healplanet/products",
          }
        );

        urls.push(result.secure_url);
      }

      res.json({ success: true, urls });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ success: false });
    }
  }
);

export default router;
