const mongoose = require("mongoose");
// const taskModel = require("./task");
const dotenv = require("dotenv");

dotenv.config();

// mongoose.set("debug", true);

var conn = mongoose.createConnection(
  "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PWD +
    "@" +
    process.env.MONGO_CLUSTER +
    "/" +
    process.env.MONGO_DB +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

async function getTasks(category, date, username) {
  let result;
  if (!category && !date && !username) {
    result = await taskModel.find();
  } else if (!category && !date) {
    result = await findTasksByUsername(username); //http://localhost:5005/tasks/?username=dustint121
  } else if (category && !date) {
    result = await findTaskByCategoryandUsername(category, username); //http://localhost:5005/tasks/?username=dustint121&category=School
  } else if (date && !category) {
    result = await findTaskByDate(date);
  } else {
    result = await findTaskByCategoryAndDate(category, date);
  }
  return result;
}

async function getCategories() {
  return await taskModel.distinct("category");
}

async function getCategoriesOfUser(username) {
  return await taskModel.distinct("category", { username: username });
}

async function findTaskById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function deleteCompleteByUser(user) {
  return await taskModel.deleteMany({ username: user, completed: true });
}

async function deleteTaskById(id) {
  try {
    return await taskModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addTask(task) {
  try {
    const taskToAdd = new taskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editTask(task, id) {
  try {
    return await taskModel.findByIdAndUpdate({ _id: id }, { $set: task });
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function sortTasks(category, username) {
  if (category == undefined) {
    return await taskModel.find({ username: username }).sort({ date: 1 });
  } else {
    return await taskModel
      .find({ category: category, username: username })
      .sort({ date: 1 });
  }
}

async function findTasksByUsername(username) {
  return await taskModel.find({ username: username });
}

async function findTaskByCategoryandUsername(category, username) {
  return await taskModel.find({ username: username, category: category });
}

async function findTaskByDate(date) {
  return await taskModel.find({ date: date });
}

async function findTaskByCategoryAndDate(category, date) {
  return await taskModel.find({ category: category, date: date });
}

async function completeTask(id, completed) {
  try {
    return await taskModel.findByIdAndUpdate(
      { _id: id },
      { completed: completed }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

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
    },
    username: {
      type: String,
      // required: true,
      trim: true
    }
  },
  { collection: "task_list" }
);

const taskModel = conn.model("Task", TaskSchema);

exports.deleteTaskById = deleteTaskById;
exports.getTasks = getTasks;
exports.findTaskById = findTaskById;
exports.addTask = addTask;
exports.editTask = editTask;
exports.getCategories = getCategories;
exports.getCategoriesOfUser = getCategoriesOfUser;
exports.completeTask = completeTask;
exports.deleteCompleteByUser = deleteCompleteByUser;
exports.sortTasks = sortTasks;
