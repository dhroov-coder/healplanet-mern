import express from "express";
import Product from "../models/ProductModel.js";
import { adminAuth } from "../middleware/auth.js";
import upload from "../middleware/upload.js"; // ✅ IMPORTANT

const router = express.Router();

/* ---------------------------------------------
   GET ALL PRODUCTS (Admin Panel)
---------------------------------------------- */
router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

/* ---------------------------------------------
   CREATE PRODUCT (WITH IMAGE UPLOAD)
---------------------------------------------- */
router.post(
  "/products",
  adminAuth,
  upload.array("images", 5), // ✅ THIS WAS MISSING
  async (req, res) => {
    try {
      const { name, slug, category, description } = req.body;

      if (!name || !slug || !category) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // ✅ Cloudinary image URLs
      const imageUrls = req.files?.map(file => file.path) || [];

      const newProduct = await Product.create({
        name,
        slug,
        category,
        description,
        images: imageUrls,
      });

      res.status(201).json({ success: true, product: newProduct });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Product creation failed" });
    }
  }
);

/* ---------------------------------------------
   UPDATE PRODUCT BY ID (OPTIONAL IMAGE UPDATE)
---------------------------------------------- */
router.put(
  "/products/:id",
  adminAuth,
  upload.array("images", 5), // ✅ allow image update
  async (req, res) => {
    try {
      const { name, slug, category, description } = req.body;

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // ✅ If new images uploaded → replace
      if (req.files && req.files.length > 0) {
        product.images = req.files.map(file => file.path);
      }

      product.name = name || product.name;
      product.slug = slug || product.slug;
      product.category = category || product.category;
      product.description = description || product.description;

      const updatedProduct = await product.save();
      res.status(200).json({ success: true, product: updatedProduct });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Product update failed" });
    }
  }
);

/* ---------------------------------------------
   DELETE PRODUCT
---------------------------------------------- */
router.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product delete failed" });
  }
});

export default router;
