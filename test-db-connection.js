const mongoose = require("mongoose");
require("dotenv").config();

// Get MongoDB URI from environment variable or use the default one
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://visarutsankham:35mydVrXrfLSXeKP@thaipbs-budget-ideas-66.u4ryaqn.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-budget-ideas-66";

async function testConnection() {
  console.log("Testing MongoDB connection...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB!");

    // Create a test schema and model
    const TestSchema = new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now },
    });

    const Test = mongoose.model("Test", TestSchema);

    // Insert a test document
    console.log("Creating test document...");
    const testDoc = new Test({ name: "Test Connection" });
    await testDoc.save();
    console.log("✅ Successfully created test document!");

    // Find the test document
    console.log("Retrieving test document...");
    const foundDoc = await Test.findOne({ name: "Test Connection" });
    console.log("✅ Successfully retrieved test document:", foundDoc);

    // Delete the test document
    console.log("Deleting test document...");
    await Test.deleteOne({ _id: foundDoc._id });
    console.log("✅ Successfully deleted test document!");

    console.log("All tests passed! 🎉");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Closed MongoDB connection");
  }
}

testConnection();
