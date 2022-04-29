const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                    throw new Error("Invalid job, must be at least 2 characters.");
            },
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