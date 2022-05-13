const mongoose = require("mongoose");
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
    process.env.MONGO_DB2 +
    "?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/users",
  {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true
  }
);
// .catch((error) => console.log(error));

async function getUsers(name) {
  let result;
  if (name === undefined) {
    result = await userModel.find();
  } else {
    result = await findUserByName(name);
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

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

const UserSchema = new mongoose.Schema(
  {
    name: {
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
