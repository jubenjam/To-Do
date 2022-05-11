const mongoose = require("mongoose");
const taskModel = require("./task");
const dotenv = require("dotenv");

dotenv.config();

// mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .catch((error) => console.log(error));

async function getTasks(category, date) {
  let result;
  if (category === undefined && date === undefined) {
    result = await taskModel.find();
  } else if (category && !date) {
    result = await findTaskByCategory(category);
  } else if (date && !category) {
    result = await findTaskByDate(date);
  } else {
    result = await findTaskByCategoryAndDate(category, date);
  }
  return result;
}

async function findTaskById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
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

async function findTaskByCategory(category) {
  return await taskModel.find({ category: category });
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
    return false;
  }
}

exports.deleteTaskById = deleteTaskById;
exports.getTasks = getTasks;
exports.findTaskById = findTaskById;
exports.addTask = addTask;
exports.editTask = editTask;
exports.completeTask = completeTask;
