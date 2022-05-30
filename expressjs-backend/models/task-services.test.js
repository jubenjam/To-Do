const taskServices = require("./task-services.js");

let d = new Date("July 21, 2022");
let dd = new Date("January 3, 2023");

let taskObj = {
  task: "go to the beach",
  date: d,
  category: "social life",
  username: "arigoodmann",
  completed: false
};

let taskOne = {
  task: "take nacho to the dog park"
};

let list;

// TESTS FOR TASK-SERVICES.JS
test("Test to add a task-- success", async () => {
  list = await taskServices.getTasks();
  const data = await taskServices.addTask(taskObj);
  taskObj._id = data._id;
  expect(data.date).toBe(taskObj.date);
  expect(data.category).toBe(taskObj.category);
  expect(data.completed).toBe(taskObj.completed);
  expect(data.username).toBe(taskObj.username);
  taskServices.addTask();
  const data2 = await taskServices.getTasks("social life");
  expect(data2[0].category).toStrictEqual("social life");
  const data3 = await taskServices.getTasks(undefined, d);
  expect(data3[0].date).toStrictEqual(d);
  const data4 = await taskServices.getTasks("social life", d);
  expect(data4[0].category).toStrictEqual("social life");
  expect(data4[0].date).toStrictEqual(d);
});

test("Test to get task by username -- success", async () => {
  const data = await taskServices.getTasks(
    undefined,
    undefined,
    taskObj.username
  );
  expect(data[0].username).toBe(taskObj.username);
});

test("Categories", async () => {
  const expected = [taskObj.category];
  const array = await taskServices.getCategories();
  expect(array).toEqual(expect.arrayContaining(expected));
  const array2 = await taskServices.getCategoriesOfUser("arigoodmann");
  expect(array2).toEqual(expect.arrayContaining(expected));
});

test("Sort", async () => {
  const sorted = await taskServices.sortTasks(undefined, "arigoodmann");
  expect(sorted[0].task).toStrictEqual(taskObj.task);
  const sorted2 = await taskServices.sortTasks(taskObj.category, "arigoodmann");
  expect(sorted2[0].task).toStrictEqual(taskObj.task);
  expect(sorted2[0].category).toStrictEqual(taskObj.category);
  const sorted3 = await taskServices.sortTasks("undefined", "arigoodmann");
  expect(sorted3).toStrictEqual([]);
});

test("Failure states", async () => {
  await taskServices.deleteTaskById("taskObj._id");
  const list2 = await taskServices.getTasks();
  expect(list2).not.toStrictEqual(list);
  const taskFound = await taskServices.findTaskById("");
  expect(taskFound).toBe(undefined);
  const deleted = await taskServices.deleteCompleteByUser("Jeremy");
  expect(deleted.deletedCount).toBe(0);
  const edited = await taskServices.editTask(taskOne, "none");
  expect(edited).toBe(false);
  const completed = await taskServices.completeTask("none", true);
  expect(completed).toBe(undefined);
});

test("Test to edit task -- success", async () => {
  const edited = await taskServices.editTask(taskOne, taskObj._id);
  expect(edited._id).toStrictEqual(taskObj._id);
  await taskServices.completeTask(taskObj._id, true);
  const received = await taskServices.findTaskById(taskObj._id);
  expect(received.task).toBe(taskOne.task);
  expect(received.completed).toBe(true);
});

test("Test to delete task by ID -- success", async () => {
  await taskServices.deleteTaskById(taskObj._id);
  const list2 = await taskServices.getTasks();
  expect(list2).toStrictEqual(list);
});
