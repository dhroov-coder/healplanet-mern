import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/upload-images",
  upload.array("images", 10),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false });
      }

      // 👇 multer-storage-cloudinary already uploaded files
      const urls = req.files.map(file => file.path);

      res.json({ success: true, urls });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ success: false });
    }
  }
);

export default router;
