const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("./models/itemModel.js"); // Ensure this matches your model file name

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("🔥 Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// **Load Data from JSON file**
const importData = async () => {
  try {
    await connectDB(); // Connect to DB

    const jsonData = JSON.parse(fs.readFileSync("./data.json", "utf-8")); // ✅ Use correct relative path
    await Product.insertMany(jsonData); // Insert into DB

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Data Import Failed:", error);
    process.exit(1);
  }
};

// **Run Seeder**
importData();
