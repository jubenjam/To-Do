const express = require("express");
const cors = require("cors");

const taskServices = require("./models/task-services");
const userServices = require("./models/user-services");

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

app.get("/tasks", async (req, res) => {
  const category = req.query["category"];
  const date = req.query["date"];
  const username = req.query["username"];
  try {
    const result = await taskServices.getTasks(category, date, username);
    res.send({ task_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await taskServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ task_list: result });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const username = req.query["username"];
    if (!username) {
      const result = await taskServices.getCategories();
      res.send({ category_list: result });
    } else {
      const result = await taskServices.getCategoriesOfUser(username);
      res.send({ category_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.post("/tasks", async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await taskServices.deleteTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.delete("/tasks", async (req, res) => {
  const user = req.query["username"];
  const result = await taskServices.deleteCompleteByUser(user);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await taskServices.editTask(req.body, id);
  if (result === undefined || result === null)
    res.status(500).send("Resource not found");
  else {
    res.status(201).end();
  }
});

app.patch("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.editUser(req.body, id);
  if (result === undefined || result === null)
    res.status(500).send("Resource not found");
  else {
    res.status(201).end();
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.deleteUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

//localhost:5005/users/?username=dustint121&password=121498765aA
http: app.get("/users", async (req, res) => {
  const username = req.query["username"];
  const password = req.query["password"];
  try {
    const result = await userServices.getUsers(username, password);
    res.send({ user_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ user_list: result });
  }
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

app.patch("/users/:username", async (req, res) => {
  const newPassword = req.body;
  const updatedUser = await userServices.changePassword(
    req.params["username"],
    newPassword
  );
  if (updatedUser) res.status(201).send(updatedUser);
  else res.status(500).end();
});

app.get("/sort", async (req, res) => {
  try {
    const username = req.query["username"];
    const category = req.query["category"];
    const result = await taskServices.sortTasks(category, username);
    res.send({ task_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});
