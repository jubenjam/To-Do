const taskServices = require("./task-services.js");
const userServices = require("./user-services.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// let mongoServer;
// let conn;
// let task_schema;
// let result;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   };

//   conn = mongoose.createConnection(uri, mongooseOpts);

//   task_schema = conn.model("Tasks", taskSchema);

//   taskServices.connect(conn);
// });

// afterAll(async () => {
//     await conn.dropDatabase();
//     await conn.close();
//     await mongoServer.stop();
// });

// beforeEach(async () => {
//     let dummyTask = {
//       category: "school",
//       _id: mongoose.Types.ObjectId("508f191e810c19729de860ea"),
//       date: "FIX",
//       completed: false,
//     };
//     let result = new task_schema(dummyTask);
//     await result.save();
//     let dummyTask1 = {
//       category: "laundry",
//       _id: mongoose.Types.ObjectId("203f191e810c19729de860ea"),
//       date: "FIX",
//       completed: false,
//     };
//     let result1 = new task_schema(dummyTask1);
//     await result1.save();
//     let dummyTask2 = {
//       category: "cleaning",
//       _id: mongoose.Types.ObjectId("101f191e810c19729de860ea"),
//       date: "FIX",
//       completed: false,
//     };
//     let result2 = new task_schema(dummyTask2);
//     await result2.save();
//   });

//   afterEach(async () => {
//     await task_schema.deleteMany();
//   });

// TESTS FOR TASK-SERVICES.JS
// test('check connection', async () => {
//     taskServices.createConnection();
//     });

// test('Testing if user can get task -- success', () => {
//     taskServices.getTasks();
//     });

// test('Testing if user can get categories -- success', () => {
//     taskServices.getCategories();
//     });

// test('Test -- success', () => {
//     taskServices.getCategoriesOfUser();
//     });

// test("Find task by ID", async () => {
//   const id = "508f191e810c19729de860ea";
//   const tasks = (await task) - services.findTaskById(id);
//   expect(result).toBeDefined();
//   tasks.forEach((tasks) => expect(result._id.toString()).toBe(id));
//   expect(1).toBe(1);
// });

// test('Test -- success', () => {
//     taskServices.deleteTaskById();
//     });

// test('Test -- success', () => {
//     taskServices.addTask();
//     });

// test('Test -- success', () => {
//     taskServices.editTask();
//     });

// test('Test -- success', () => {
//     taskServices.completeTask();
//     });

// test('Testing if user can add task to table -- success', () => {
//     const target = "Take dogs to the vet";
//     const task = new taskServices.task();
//     task.addTask("Take dogs to the vet");
//     const result = task.getTasks();
//     expect(target).toBe(result);
//     });

// TESTS FOR USER-SERVICES.JS
// test("check connection", async () => {
//   userServices.createConnection(conn);
// });

// test('Test -- success', () => {
//     userServices.getUsers();
//     });

// test('Test -- success', () => {
//     userServices.findUserById();
//     });

// test('Test -- success', () => {
//     userServices.deleteUserById();
//     });

// test('Test -- success', () => {
//     userServices.addUser();
//     });

// test('Test -- success', () => {
//     userServices.editUser();
//     });
