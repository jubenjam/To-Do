const mongoose = require("mongoose");
const taskModel = require("./user");
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
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getUsers(category, date) {
  let result;
  if (category === undefined && date === undefined) {
    result = await taskModel.find();
  } else if (category && !date) {
    result = await findUserByCategory(category);
  } else if (date && !category) {
    result = await findUserByJob(date);
  } else{
    result = await findUserByNameAndJob(category, date);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function deleteUserById(id) {
  try {
    return await taskModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new taskModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByCategory(category) {
  return await taskModel.find({ category: category });
}

async function findUserByJob(date) {
  return await taskModel.find({ date: date });
}

async function findUserByNameAndJob(category, date) {
  return await taskModel.find({ category: category, date: date });
}

exports.deleteUserById = deleteUserById;
exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;