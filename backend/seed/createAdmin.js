// backend/seed/createAdmin.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const email = "admin@healplanet.com";
    const password = "123456"; // change later
    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("Admin already exists:", email);
      process.exit();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const admin = await Admin.create({ email, password: hash, name: "HealPlanet Admin" });
    console.log("Admin created:", admin.email, " password:", password);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

run();
