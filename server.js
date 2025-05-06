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

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/thaipbs-budget";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
    res.status(500).json({ message: "Server error", error: error.toString() });
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

// Serve the HTML file for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${__dirname}`);
});
