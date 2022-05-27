import { useState } from "react";

function Form(props) {
  const [error, setError] = useState(false);
  const [task, setTask] = useState({
    task: "",
    date: "",
    category: "",
    completed: false,
    username: props.username
  });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "date")
      setTask({
        task: task["task"],
        date: value,
        category: task["category"],
        completed: false,
        username: props.username
      });
    else if (name === "category")
      setTask({
        task: task["task"],
        date: task["date"],
        category: value,
        completed: false,
        username: props.username
      });
    else
      setTask({
        task: value,
        date: task["date"],
        category: task["category"],
        completed: false,
        username: props.username
      });
  }
  function submitForm() {
    if (!task.task || !task.date || !task.category) {
      setError(true);
      document.getElementById("task").value = task.task;
      document.getElementById("date").value = task.date;
      document.getElementById("category").value = task.category;
    }
    else {
      setError(false);
      props.handleSubmit(task);
      setTask({
        task: "",
        date: "",
        category: "",
        completed: false,
        username: props.username
      });
    }
  }
  return (
    <form className="form-padding">
      <tr>
        <td>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={task.task}
            onChange={handleChange}
            className={!error ? '' : "error"}
          />
        </td>
        <td>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={task.date}
            onChange={handleChange}
            className={!error ? '' : "error"}
          />
        </td>
        <td>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={task.category}
            onChange={handleChange}
            className={!error ? '' : "error"}
          />
        </td>
        <td>
          <label htmlFor="submit">Add Task</label>
          <input type="button" value="Submit" onClick={submitForm} />
        </td>
      </tr>
      {error && <p className="error_msg">Please fill in the blank fields.</p>}
    </form>
  );
}

export default Form;
