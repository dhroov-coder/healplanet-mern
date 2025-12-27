import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Product basic info
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // 🔥 PRODUCT VARIANTS (PDF based sizes & specs)
    variants: [
      {
        size: {
          type: String, // example: "23x23 cm", "30x30 cm"
        },

        ply: {
          type: String, // example: "1 Ply", "2 Ply"
        },

        gsm: {
          type: String, // example: "18 GSM", "20 GSM"
        },

        sheetsPerPack: {
          type: Number, // example: 50, 100
        },

        packsPerCarton: {
          type: Number, // example: 20, 40
        },
      },
    ],

    // 🔹 Images (future use – Cloudinary)
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
