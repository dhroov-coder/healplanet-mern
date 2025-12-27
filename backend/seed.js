import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/ProductModel.js";
import { products } from "./seed/productData.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();
