// MUST BE FIRST
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

connectDB();

const app = express();

/* ======================
   CORS (NO WILDCARD)
====================== */
app.use(
  cors({
    origin: [
      "https://healplanetinternational.org",
      "https://www.healplanetinternational.org",
      "https://healplanet-mern.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================
   BODY PARSER
====================== */
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/admin", uploadRoutes);
app.use("/api/admin", adminAuth);
app.use("/api/admin", adminProducts);
app.use("/api/admin", adminEnquiries);

app.use("/api/products", productRoutes);
app.use("/api/contact", contactRouter);

/* ======================
   TEST
====================== */
app.get("/", (req, res) => {
  res.send("Backend running...");
});

/* ======================
   PING (KEEP ALIVE)
====================== */
app.get("/ping", (req, res) => {
  res.status(200).send("Server awake 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
