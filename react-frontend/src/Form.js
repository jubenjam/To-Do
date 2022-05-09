import { useState } from "react";

function Form(props) {
  const [task, setTask] = useState({
    task: "",
    date: "",
    category: "",
    completed: false
  });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "date")
      setTask({
        task: task["task"],
        date: value,
        category: task["category"],
        completed: false
      });
    else if (name === "category")
      setTask({
        task: task["task"],
        date: task["date"],
        category: value,
        completed: false
      });
    else
      setTask({
        task: value,
        date: task["date"],
        category: task["category"],
        completed: false
      });
  }
  function submitForm() {
    props.handleSubmit(task);
    setTask({ task: "", date: "", category: "", completed: false });
  }
  return (
    <form>
      <tr>
        <td>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={task.task}
            onChange={handleChange}
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
          />
        </td>
        <td>
          <label htmlFor="submit">Add Task</label>
          <input type="button" value="Submit" onClick={submitForm} />
        </td>
      </tr>
    </form>
  );
}

export default Form;
