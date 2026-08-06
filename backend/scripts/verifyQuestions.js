const GREEN="\x1b[32m";
const RED="\x1b[31m";
const RESET="\x1b[0m";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

const QUESTIONS_FOLDER = path.join(__dirname,"../../questions");

const JS_EXTENSION=".js";

let totalFiles=0;
let matchedFiles=0;
let mismatchedFiles=0;

let totalQuestionsInFiles=0;
let totalQuestionsInDB=0;

const mismatches=[];

function getAllJSFiles(dir){

    let files=[];

    const items=fs.readdirSync(dir,{withFileTypes:true});

    for(const item of items){

        const fullPath=path.join(dir,item.name);

        if(item.isDirectory()){

            files.push(...getAllJSFiles(fullPath));

        }

        else if(item.isFile() && path.extname(item.name).toLowerCase()===JS_EXTENSION){

            files.push(fullPath);

        }

    }

    return files;

}

function loadQuestions(file) {

    const code = fs.readFileSync(file, "utf8");

    const match = code.match(/\[\s*[\s\S]*\]\s*;/);

    if (!match) {

        return [];

    }

    return eval(match[0]);

}

function relative(file){

    return path.relative(QUESTIONS_FOLDER,file);

}

async function verifyFile(file) {

    const questions = loadQuestions(file);

    const sourcePath = relative(file);

    const dbCount = await Question.countDocuments({
        sourcePath: sourcePath
    });

    const fileCount = questions.length;

    totalQuestionsInFiles += fileCount;
    totalQuestionsInDB += dbCount;

    if (fileCount === dbCount) {

        matchedFiles++;

        console.log(
            `${GREEN}✓${RESET} ${sourcePath}`
        );

        console.log(
            `   File: ${fileCount} | DataBase: ${dbCount}\n`
        );

    } else {

        mismatchedFiles++;

        mismatches.push({
            file: sourcePath,
            fileCount,
            dbCount
        });

        console.log(
            `${RED}✗${RESET} ${sourcePath}`
        );

        console.log(
            `   File: ${fileCount} | DataBase: ${dbCount} | Missing: ${Math.abs(fileCount-dbCount)}\n`
        );

    }

}


async function main() {

    await connectDB();

    console.log("\n🔍 Starting Verification...\n");

    const jsFiles = getAllJSFiles(QUESTIONS_FOLDER);

    totalFiles = jsFiles.length;

    for (const file of jsFiles) {

        try {

            await verifyFile(file);

        }

        catch (err) {

            console.log(`${RED}✗${RESET} ${relative(file)}`);
            console.log(`   ${err.message}\n`);

        }

    }

    console.log("\n========================================");
    console.log("         🔍 Verification Report");
    console.log("========================================\n");

    console.log(`📂 Files Checked        : ${totalFiles}`);
    console.log(`✅ Files Matched        : ${matchedFiles}`);
    console.log(`❌ Files Mismatched     : ${mismatchedFiles}\n`);

    console.log(`📄 Questions in Files    : ${totalQuestionsInFiles}`);
    console.log(`💾 Questions in DataBase : ${totalQuestionsInDB}`);

    if (mismatchedFiles === 0) {
    
        console.log("\n========================================");
        console.log(`🟢 Status               : PASS`);
        console.log(`🎉 Database is fully synchronized.`);
        console.log("========================================");
    
    } else {
    
        console.log("\n========================================");
        console.log(`🔴 Status               : FAILED`);
        console.log(`❌ Database NOT synchronized.`);
        console.log("========================================");
    
        console.log("");
    
        mismatches.forEach(item => {
        
            console.log(`📄 ${item.file}`);
            console.log(`   File      : ${item.fileCount}`);
            console.log(`   DataBase  : ${item.dbCount}`);
            console.log(`   Missing   : ${Math.abs(item.fileCount - item.dbCount)}`);
            console.log("");
        
        });
    
    }

    mongoose.connection.close();

}

main().catch(err => {

    console.error(err);

    mongoose.connection.close();

});

//command to verify files
//npm run verify
//or
//node scripts/verifyQuestions.js