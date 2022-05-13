import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPopup(props) {
  const [task, setTask] = useState({
    task: props.selectedRow.task,
    date: props.selectedRow.date,
    category: props.selectedRow.category,
    completed: props.selectedRow.completed
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "date")
      setTask({ task: task["task"], date: value, category: task["category"] });
    else if (name === "category")
      setTask({ task: task["task"], date: task["date"], category: value });
    else
      setTask({ task: value, date: task["date"], category: task["category"] });
  }

  function submitForm() {
    props.handleEdit(task, props.selectedRow.index);
    setTask({ task: task.task, date: task.date, category: task.category });
  }

  return (
    <Modal show={true} onHide={props.handleClose}>
      <Modal.Header>
        <button
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={props.handleClose}
        >
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              name="task"
              id="task"
              defaultValue={task.task}
              onChange={handleChange}
            />

            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={task.date}
              onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              defaultValue={task.category}
              onChange={handleChange}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="button-editPopup"
          onClick={function (event) {
            props.setShow(false);
            submitForm();
          }}
        >
          Edit Task
        </button>
        <input
          className="button-deletePopup"
          value="Delete" 
          onClick={() => {
            props.removeCharacter(props.selectedRow.index);
            props.setShow(false);
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default EditPopup;
