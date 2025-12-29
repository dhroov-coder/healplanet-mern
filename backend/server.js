// 🔥 MUST BE FIRST LINE
import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import adminAuth from "./routes/adminAuth.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminProducts from "./routes/adminProducts.js";
import adminEnquiries from "./routes/adminEnquiries.js";

// 🔎 ENV DEBUG (temporary)
console.log("ENV CHECK:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "YES" : "NO",
});

connectDB();

const app = express();

/* =======================
   ✅ CORS MUST BE FIRST
======================= */
app.use(
  cors({
    origin: [
      "https://healplanet-mern.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 VERY IMPORTANT
app.options("*", cors());

/* =======================
   ✅ BODY PARSER
======================= */
app.use(express.json());

/* =======================
   ✅ ROUTES
======================= */
app.use("/api/admin", uploadRoutes);
app.use("/api/admin", adminAuth);
app.use("/api/admin", adminProducts);
app.use("/api/admin", adminEnquiries);

app.use("/api/products", productRoutes);
app.use("/api/contact", contactRouter);

/* =======================
   TEST
======================= */
app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
