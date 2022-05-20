const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

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

async function getUsers(username, password) {
  let result;
  if (username === undefined && password === undefined) {
    result = await userModel.find();
  } else if (password === undefined) {
    result = await findUserByName(username);
  } else {
    result = await matchByUsernameAndPassword(username, password);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(username) {
  return await userModel.find({ username: username });
}

async function matchByUsernameAndPassword(username, password) {
  try {
    return await userModel.find({ username: username }, { password: password });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function deleteUserById(id) {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editUser(user, id) {
  try {
    return await userModel.findByIdAndUpdate({ _id: id }, { $set: user });
  } catch (error) {
    console.log(error);
    return false;
  }
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { collection: "user_list" }
);

const userModel = conn.model("User", UserSchema);

exports.deleteUserById = deleteUserById;
exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.editUser = editUser;
