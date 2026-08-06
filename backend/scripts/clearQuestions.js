const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

(async () => {
    await connectDB();

    const result = await Question.deleteMany({});

    console.log(`🗑 Deleted ${result.deletedCount} questions`);

    mongoose.connection.close();
})();


//run this command to clear all questions 
//node scripts/clearQuestions.js

//expected output 
//🗑 Deleted 9681 questions