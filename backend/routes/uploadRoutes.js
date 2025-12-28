import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/upload-images",
  adminAuth,
  upload.array("images", 10),
  (req, res) => {
    try {
      if (!req.files?.length) {
        return res.status(400).json({ success: false });
      }

      // ✅ DIRECT URL from multer-storage-cloudinary
      const urls = req.files.map(file => file.path);

      res.json({ success: true, urls });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
);

export default router;
