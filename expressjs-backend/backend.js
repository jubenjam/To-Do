const express = require("express");
const cors = require("cors");

const taskServices = require("./models/task-services");

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/tasks", async (req, res) => {
  const category = req.query["category"];
  const date = req.query["date"];
  try {
    const result = await taskServices.getTasks(category, date);
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
