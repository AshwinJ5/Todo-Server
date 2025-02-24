const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["medium", "low", "high"],
        message: "Priority must be either high, medium, or low",
    },
    createdAt: { type: Date, default: Date.now },
});
const todos = mongoose.model("todo", todoSchema);
module.exports = todos;
