import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/upload-images",
  adminAuth,
  upload.array("images", 5),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false });
    }

    const urls = req.files.map(file => file.path);

    res.json({
      success: true,
      urls,
    });
  }
);

export default router;
