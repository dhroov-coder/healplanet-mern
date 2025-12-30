import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/upload-images",

  // ✅ STEP 1: auth FIRST
  adminAuth,

  // ✅ STEP 2: upload AFTER auth
  upload.array("images", 5),

  // ✅ STEP 3: controller
  (req, res) => {
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
  }
);

export default router;
