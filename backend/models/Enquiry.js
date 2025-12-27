import mongoose from "mongoose";

const enqSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  country: String,
  quantity: String,
  message: String,
  product: String,
}, { timestamps: true });

export default mongoose.model("Enquiry", enqSchema);
