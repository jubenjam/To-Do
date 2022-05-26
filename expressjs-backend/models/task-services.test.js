const taskServices = require("./task-services.js");

let d = new Date("July 21, 2022");
let dd = new Date("January 3, 2023");


let taskObj = {
  task: "go to the beach",
  id: "6287f53097ab349d1160131c",
  date: d,
  category: "social life",
  username: "arigoodmann",
  completed: true
};

let taskOne = {
    task: "take nacho to the dog park",
    id: "508f191e810c19729de860ea",
    date: dd,
    category: "dogs",
    completed: false,
    username: "ggood"
};

// let taskTwo = {
//     task: "calculus test",
//     date: 2022-05-29,
//     category: "school",
//     completed: false,
//     username: "yun_14"
// };

let list;

// TESTS FOR TASK-SERVICES.JS
test('Test to add a task-- success', async () => {
    list = await taskServices.getTasks();
    const data = await taskServices.addTask(taskObj);
    taskObj._id = data._id;
    expect(data.date).toBe(taskObj.date);
    expect(data.category).toBe(taskObj.category);
    expect(data.completed).toBe(taskObj.completed);
    expect(data.username).toBe(taskObj.username);
    taskServices.addTask();
    });
      

test('Test to get task by username -- success', async () => {
    const data = await taskServices.getTasks(undefined, undefined, taskObj.username);
    expect(data[0].username).toBe(taskObj.username);

});

test('Test to find task by ID -- success', async () => {
    const data = await taskServices.findTaskById(taskObj.id);
    expect(data.id).toBe(taskObj.id);
});

// test('Test to edit task -- success', async () => {
//     await taskServices.editTask()
// }

// test("Editing task", async () => {
//     await taskServices.editTask(taskOne, taskObj._id);
//     const list2 = await taskServices.getTasks(taskOne.task);
//     expect(taskOne.task).toStrictEqual(list2[0].task);
   
//   });


// test('Test to delete task by ID -- success', async () => {
//     const data = await taskServices.getTasks(taskObj.id);
//     taskObj._id = data._id;
//     expect(data.id).toBe(taskObj.id);
//     taskServices.deleteTaskById();
// }

// test('Testing if user can get task -- success', () => {
//     const task = "go t0 the beach";
//     const date = 2022-05-12;
//     taskServices.getTasks();
    
//     });


// test("Adding new user", async () => {
//   list = await userServices.getUsers();
//   const data = await userServices.addUser(userObj);
//   userObj._id = data._id;
//   expect(data.email).toBe(userObj.email);
//   expect(data.password).toBe(userObj.password);
//   expect(data.username).toBe(userObj.username);
// });

// test("Editing and Finding new user", async () => {
//   await userServices.editUser(userUp, userObj._id);
//   const list2 = await userServices.getUsers(userUp.username);
//   expect(userUp.username).toStrictEqual(list2[0].username);
//   const list3 = await userServices.getUsers(userUp.username, userUp.password);
//   expect(userUp.password).toBe(list3[0].password);
//   const userFound = await userServices.findUserById(userObj._id);
//   expect(userUp.username).toBe(userFound.username);
// });

// test("Wrong id", async () => {
//   const userFound = await userServices.findUserById("");
//   expect(userFound).toBe(undefined);
//   await userServices.editUser(userObj, "");
//   const list2 = await userServices.getUsers(userUp.username);
//   expect(userUp.username).toStrictEqual(list2[0].username);
//   await userServices.deleteUserById("userObj._id");
//   const list3 = await userServices.getUsers();
//   expect(list).not.toStrictEqual(list3);
// });

// test("Wrong user", async () => {
//   const list3 = await userServices.getUsers("", "");
//   expect(list3).toStrictEqual([]);
//   const data = await userServices.addUser(userNot);
//   expect(data).toBeFalsy;
// });

// test("Deleting new user", async () => {
//   await userServices.deleteUserById(userObj._id);
//   const list2 = await userServices.getUsers();
//   expect(list).toStrictEqual(list2);
// });


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


// exports.deleteTaskById = deleteTaskById;
// exports.getTasks = getTasks;
// exports.findTaskById = findTaskById;
// exports.editTask = editTask;
// exports.getCategories = getCategories;
// exports.getCategoriesOfUser = getCategoriesOfUser;
// exports.completeTask = completeTask;
// exports.deleteCompleteByUser = deleteCompleteByUser;
// exports.sortTasks = sortTasks;