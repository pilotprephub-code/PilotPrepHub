let failedFiles = [];
let failedQuestions = 0;

const GREEN="\x1b[32m";
const RED="\x1b[31m";
const CYAN="\x1b[36m";
const YELLOW="\x1b[33m";
const RESET="\x1b[0m";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

// Path to your questions folder
const QUESTIONS_FOLDER = path.join(__dirname, "../../questions");

// Supported JS extensions
const JS_EXTENSION = ".js";

// Counter
let totalImported = 0;
let totalSkipped = 0;
let totalFiles = 0;

function getAllJSFiles(dir) {

    let files = [];

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {

        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {

            files.push(...getAllJSFiles(fullPath));

        } else if (
            item.isFile() &&
            path.extname(item.name).toLowerCase() === JS_EXTENSION
        ) {

            files.push(fullPath);

        }

    }

    return files;

}

function getMetadata(filePath) {

    const relative = path.relative(QUESTIONS_FOLDER, filePath);

    const parts = relative.split(path.sep);

    const subject = parts[0] || "Unknown";

    const chapter = path.basename(filePath, ".js");

    const subSubject =
        parts.length > 2
            ? parts.slice(1, parts.length - 1).join(" > ")
            : (parts.length === 2 ? "General" : "General");

    return {

        subject,

        subSubject,

        chapter,

        sourceFile: path.basename(filePath),

        sourcePath: relative

    };

}

function loadQuestionsFromFile(filePath) {

    let code = fs.readFileSync(filePath, "utf8").trim();

    // Remove trailing semicolon if present
    if (code.endsWith(";")) {
        code = code.slice(0, -1);
    }

    // Find first '['
    const start = code.indexOf("[");

    // Find last ']'
    const end = code.lastIndexOf("]");

    if (start === -1 || end === -1) {
        throw new Error("Question array not found");
    }

    const arrayText = code.substring(start, end + 1);

    return vm.runInNewContext("(" + arrayText + ")");
}

function generateQuestionId(metadata, index) {

    const subject = metadata.subject
        .replace(/\s+/g, "_")
        .replace(/>/g, "_")
        .toUpperCase();

    const subSubject = metadata.subSubject
        .replace(/\s+/g, "_")
        .replace(/>/g, "_")
        .toUpperCase();

    const chapter = metadata.chapter
        .replace(/\s+/g, "_")
        .replace(/>/g, "_")
        .toUpperCase();

    return `${subject}_${subSubject}_${chapter}_${String(index + 1).padStart(5, "0")}`;

}

async function importFile(filePath, existingIds) {

    const duplicateCheck = new Set();

    const metadata = getMetadata(filePath);

    const questions = loadQuestionsFromFile(filePath);

    if (!questions.length) {

        console.log("⚠ Empty Question File");

        return;

    }

    console.log("\n========================================");
    console.log(`📂 ${metadata.sourcePath}`);
    console.log("========================================");

    let imported = 0;
    let updated = 0;

    for (let i = 0; i < questions.length; i++) {

        const q = questions[i];

        const duplicateKey = q.question.trim().toLowerCase();

        if (duplicateCheck.has(duplicateKey)) {
            console.log(`⚠ Duplicate Question: ${q.question}`);
        }

        duplicateCheck.add(duplicateKey);

        const questionId = generateQuestionId(metadata, i);

        if (existingIds.has(questionId)) {

            await Question.updateOne(
                { questionId },
                {
                    $set: {
                        subject: metadata.subject,
                        subSubject: metadata.subSubject,
                        chapter: metadata.chapter,
                        question: q.question,
                        options: q.options,
                        answer: q.answer,
                        explanation: q.explanation || "",
                        difficulty: q.difficulty || "normal",
                        sourceFile: metadata.sourceFile,
                        sourcePath: metadata.sourcePath
                    }
                }
            );

            totalSkipped++;
            updated++;

        } else {

            await Question.create({

                questionId,

                subject: metadata.subject,

                subSubject: metadata.subSubject,

                chapter: metadata.chapter,

                question: q.question,

                options: q.options,

                answer: q.answer,

                explanation: q.explanation || "",

                difficulty: q.difficulty || "normal",

                sourceFile: metadata.sourceFile,

                sourcePath: metadata.sourcePath

            });

            existingIds.add(questionId);

            totalImported++;
            imported++;

        }

    }

    console.log(`   ✅ Imported : ${imported}`);
    console.log(`   🔄 Updated  : ${updated}`);

}


const startTime = Date.now();



async function main() {

    await connectDB();

    console.log("\n");
    console.log("🚀 Starting Import...\n");

    const targetFile = process.argv[2];

    let jsFiles;

    if (targetFile) {
        jsFiles = [path.join(QUESTIONS_FOLDER, targetFile)];
            } else {
        jsFiles = getAllJSFiles(QUESTIONS_FOLDER);
            }

    totalFiles = jsFiles.length;

    console.log(`Found ${totalFiles} js files\n`);

    // Load all existing IDs once
    const existingQuestions = await Question.find({}, "questionId");

    const existingIds = new Set(
        existingQuestions.map(q => q.questionId)
    );

    for (const file of jsFiles) {

        try {

            await importFile(file, existingIds);

        } catch (err) {

            if (err.message.includes("Question validation failed")) {

                failedFiles.push({
                    file: path.relative(QUESTIONS_FOLDER, file),
                    reason: err.message
                });

            }

            console.log("\n❌ IMPORT FAILED");
            console.log(err.message);
    }

}
    const endTime = Date.now();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeTaken = `${minutes} min ${seconds} sec`;

    console.log("\n");
    console.log("\n");
    console.log("==============================================");

    console.log(`               ${GREEN}🎉 IMPORT COMPLETED${RESET}`);
    // console.log(`               ${YELLOW}⚠  Duplicates Found${RESET}`);

    console.log("----------------------------------------------");

    console.log(`📂 Files Scanned      : ${totalFiles}`);

    console.log(`✅ Questions Imported : ${totalImported}`);

    console.log(`🔄 Questions Updated  : ${totalSkipped}`);

    console.log(`⌛ Time Taken         : ${timeTaken}`);

    console.log("==============================================");


    console.log("\n");

    console.log("==============================================");
    console.log(`${RED}❌ FAILED FILES (${failedFiles.length})${RESET}`);
    console.log("==============================================");

    if (failedFiles.length === 0) {

        console.log("🎉 No failed files found.");
        console.log("\n");

    } else {

        failedFiles.forEach((f, index) => {

            console.log(`${index + 1}. 📄 ${f.file}`);
            console.log(`   ➜ ${f.reason}`);
            console.log("\n");

        });

    }

    await mongoose.connection.close();

}

main().catch(err => {

    console.error(err);

    mongoose.connection.close();

});

//to import all questions again, run this
//npm run import
//or
//node scripts/importQuestions.js


//to import a particulat js file, run this
//npm run import -- Technical_Specific/cessna_172.js
//npm run import -- Air_Regulation/RK_Bali/10_search_and_rescue.js
//npm run import -- Meteorology/IC_Joshi/5_clouds.js
//npm run import -- Navigation/Navigation_General/Oxford/17_general_chart_properties.js