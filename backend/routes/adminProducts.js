import express from "express";
import Product from "../models/ProductModel.js";
import { adminAuth } from "../middleware/auth.js";

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
   CREATE PRODUCT (URL BASED IMAGES)
---------------------------------------------- */
router.post("/products", adminAuth, async (req, res) => {
  try {
    const { name, slug, category, description, images } = req.body;

    // Basic validation
    if (!name || !slug || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = await Product.create({
      name,
      slug,
      category,
      description,
      images: images && Array.isArray(images) ? images : [],
    });

    res.status(201).json({ success: true, product: newProduct });

  } catch (err) {
    console.log("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Product creation failed" });
  }
});

/* ---------------------------------------------
   UPDATE PRODUCT BY ID (URL BASED IMAGES)
---------------------------------------------- */
router.put("/products/:id", adminAuth, async (req, res) => {
  try {
    const { name, slug, category, description, images } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.category = category || product.category;
    product.description = description || product.description;

    // ✅ Replace images only if array is sent
    if (images && Array.isArray(images)) {
      product.images = images;
    }

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, product: updatedProduct });

  } catch (err) {
    console.log("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Product update failed" });
  }
});

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
    console.log("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Product delete failed" });
  }
});

export default router;
