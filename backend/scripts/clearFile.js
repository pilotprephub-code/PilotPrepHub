const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

(async () => {
    const fileName = process.argv[2];

    if (!fileName) {
        console.log("❌ Usage: node scripts/clearFile.js <filename>");
        process.exit(1);
    }

    await connectDB();

    const result = await Question.deleteMany({
        sourceFile: fileName
    });

    console.log("\n")
    console.log(`🗑 Deleted ${result.deletedCount} questions from ${fileName}`);
    console.log("\n")
    
    mongoose.connection.close();
})();


//command
//node scripts/clearFile.js 1_international_organisations_and_conventions.js