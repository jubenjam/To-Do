const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      required: true,
      trim: true
    }
  },
  { collection: "task_list" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
