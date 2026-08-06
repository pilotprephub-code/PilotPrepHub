const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const Question = require("./models/Question");

// Import Routes
const questionRoutes = require("./routes/questionRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", questionRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("PilotPrepHub Backend is Running 🚀");
});

// Database Test Route
app.get("/test-db", async (req, res) => {

    try {

        const count = await Question.countDocuments();

        res.json({
            totalQuestions: count
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


// Commands

// cd backend
// npm run dev
// Open:
// http://localhost:5000 or right click index.html > open with live server