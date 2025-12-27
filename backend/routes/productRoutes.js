import express from "express";
import Product from "../models/ProductModel.js";

const router = express.Router();

/* ---------------------------
   GET ALL PRODUCTS
---------------------------- */
router.get("/", async (req, res) => {
  const category = req.query.category;
  let products;

  if (category) {
    products = await Product.find({ category });
  } else {
    products = await Product.find({});
  }

  res.json(products);
});

/* ---------------------------
   GET PRODUCT BY ID (Admin Edit Page)
   IMPORTANT: This must be ABOVE the slug route
---------------------------- */
router.get("/id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ---------------------------
   GET PRODUCT BY SLUG (Public Website)
---------------------------- */
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ---------------------------
   CREATE PRODUCT
---------------------------- */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

export default router;
