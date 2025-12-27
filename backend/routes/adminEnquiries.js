import express from "express";
import Enquiry from "../models/Enquiry.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/enquiries", adminAuth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.log(err); res.status(500).json({ message: "Server error" });
  }
});

export default router;
