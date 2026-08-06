const express = require("express");

const router = express.Router();

const {
    getSubjects,
    getSubSubjects,
    getChapters,
    getQuestions
} = require("../controllers/questionController");

// Get all subjects
router.get("/subjects", getSubjects);

// Get sub-subjects
router.get("/subjects/:subject/subsubjects", getSubSubjects);

// Get chapters
router.get("/chapters", getChapters);

// Get questions
router.get("/questions", getQuestions);

module.exports = router;