const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: "users_list" }
);

const Task = mongoose.model("User", TaskSchema);

module.exports = Task;