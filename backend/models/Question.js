const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
{
    questionId: {
        type: String,
        unique: true
    },

    subject: {
        type: String,
        required: true
    },

    subSubject: {
        type: String,
        default: "General"
    },

    chapter: {
        type: String,
        required: true
    },

    question: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        required: true
    },

    answer: {
        type: String,
        required: true
    },

    explanation: {
        type: String,
        default: ""
    },

    difficulty: {
        type: String,
        default: "normal"
    },

    sourceFile: {
        type: String,
        default: ""
    },

    sourcePath: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);