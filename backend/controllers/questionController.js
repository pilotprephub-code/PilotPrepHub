const Question = require("../models/Question");

// Get all subjects
exports.getSubjects = async (req, res) => {

    try {

        const subjects = await Question.distinct("subject");

        subjects.sort();

        res.json(subjects);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get sub-subjects of a subject
exports.getSubSubjects = async (req, res) => {

    try {

        const { subject } = req.params;

        const subSubjects = await Question.distinct(
            "subSubject",
            { subject }
        );

        subSubjects.sort();

        res.json(subSubjects);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get chapters
exports.getChapters = async (req, res) => {

    try {

        const { subject, subSubject } = req.query;

        const filter = {};

        if (subject)
            filter.subject = subject;

        if (subSubject)
            filter.subSubject = subSubject;

        const chapters = await Question.distinct(
            "chapter",
            filter
        );

        chapters.sort();

        res.json(chapters);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get questions
exports.getQuestions = async (req, res) => {

    try {

        const filter = {};

        if (req.query.subject)
            filter.subject = req.query.subject;

        if (req.query.subSubject)
            filter.subSubject = req.query.subSubject;

        if (req.query.chapter)
            filter.chapter = req.query.chapter;

        const questions = await Question.find(
            filter,
            {
                _id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                sourceFile: 0,
                sourcePath: 0
            }
        );

        res.json(questions);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};