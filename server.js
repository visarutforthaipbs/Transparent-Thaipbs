const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files more explicitly - make sure this is before routes
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "public")));

// Track MongoDB connection status
let isMongoConnected = false;

// Demo mode sample data
const DEMO_IDEAS = [
  { text: "สารคดีเชิงลึกเกี่ยวกับชุมชนริมแม่น้ำเจ้าพระยา", value: 8 },
  { text: "รายการสอนทักษะดิจิทัลสำหรับผู้สูงอายุ", value: 6 },
  { text: "สื่อการศึกษาออนไลน์ที่เข้าถึงได้สำหรับทุกคน", value: 5 },
  { text: "รายการเกี่ยวกับเกษตรอินทรีย์และความยั่งยืน", value: 4 },
  {
    text: "พื้นที่แลกเปลี่ยนความคิดเห็นเยาวชนเกี่ยวกับอนาคตประเทศไทย",
    value: 4,
  },
  { text: "สารคดีอาหารท้องถิ่นในแต่ละภูมิภาค", value: 3 },
  { text: "รายการเกี่ยวกับสุขภาพจิตและความเป็นอยู่ที่ดี", value: 3 },
  { text: "รายการตรวจสอบข้อเท็จจริงและต่อต้านข่าวปลอม", value: 2 },
];

// Demo mode - in-memory storage for when MongoDB is not available
let demoIdeas = [...DEMO_IDEAS]; // Clone the demo ideas array
let isDemoMode = false;

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/thaipbs-budget";

console.log("Attempting to connect to MongoDB...");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    isMongoConnected = true;
    isDemoMode = false;
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Enabling DEMO MODE - using sample data");
    isMongoConnected = false;
    isDemoMode = true;
  });

// Create Idea Schema and Model
const ideaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Idea = mongoose.model("Idea", ideaSchema);

// API Routes
// Get all ideas (with frequency count)
app.get("/api/ideas", async (req, res) => {
  try {
    // If in demo mode, return demo ideas
    if (isDemoMode) {
      console.log("Using DEMO MODE - returning sample ideas");
      return res.json(demoIdeas);
    }

    // If MongoDB isn't connected, return empty array
    if (!isMongoConnected) {
      console.log("MongoDB not connected - returning empty ideas array");
      return res.json([]);
    }

    // Aggregate ideas to count duplicates and sort by frequency
    const ideas = await Idea.aggregate([
      {
        $group: {
          _id: { $toLower: "$idea" },
          idea: { $first: "$idea" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Make sure to return an empty array if no results
    const result = ideas.map((item) => ({
      text: item.idea,
      value: item.count,
    }));

    console.log("API response:", result);
    res.json(result);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    // Return empty array on error to prevent client-side errors
    res.json([]);
  }
});

// Submit a new idea
app.post("/api/submit", async (req, res) => {
  try {
    const { idea } = req.body;
    console.log("Received idea submission:", idea);

    if (!idea || idea.trim() === "") {
      return res.status(400).json({ message: "Idea cannot be empty" });
    }

    // If in demo mode, add to demo ideas
    if (isDemoMode) {
      console.log("Using DEMO MODE - storing idea in memory");

      // Check if idea already exists
      const existingIndex = demoIdeas.findIndex(
        (item) => item.text.toLowerCase() === idea.toLowerCase()
      );

      if (existingIndex >= 0) {
        // Increment value if it exists
        demoIdeas[existingIndex].value += 1;
      } else {
        // Add new idea
        demoIdeas.push({ text: idea, value: 1 });
      }

      // Sort by value
      demoIdeas.sort((a, b) => b.value - a.value);

      return res.status(201).json({
        message: "Idea submitted successfully (DEMO MODE)",
        idea: { idea, createdAt: new Date() },
        note: "In demo mode, data is not saved permanently",
      });
    }

    // Check MongoDB connection first
    if (!isMongoConnected) {
      console.log("MongoDB not connected - can't submit idea");
      return res.status(503).json({
        message: "Database currently unavailable. Please try again later.",
      });
    }

    const newIdea = new Idea({ idea });
    await newIdea.save();

    res
      .status(201)
      .json({ message: "Idea submitted successfully", idea: newIdea });
  } catch (error) {
    console.error("Error submitting idea:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mongoConnected: isMongoConnected,
    mode: isDemoMode ? "demo" : "production",
    timestamp: new Date().toISOString(),
  });
});

// Serve the HTML file for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${__dirname}`);
  console.log(`Running in ${isDemoMode ? "DEMO" : "PRODUCTION"} mode`);
});
