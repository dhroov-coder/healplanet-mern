import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/upload-images",
  adminAuth,
  (req, res) => {
    upload.array("images", 5)(req, res, (err) => {
      if (err) {
        console.error("UPLOAD ERROR:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Upload failed",
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files received",
        });
      }

      const urls = req.files.map((file) => file.path);

      res.json({
        success: true,
        urls,
      });
    });
  }
);

export default router;
