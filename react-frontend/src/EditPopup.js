import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";

function EditPopup(props) {
  const [task, setTask] = useState({
    task: props.selectedRow.task,
    date: props.selectedRow.date,
    category: props.selectedRow.category,
    completed: props.selectedRow.completed
  });

  // let completeBtnVal = task.completed ? "Task Not Complete" : "Task Complete";

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
              // onChange={handleChange}
            />

            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={task.date}
              // onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              defaultValue={task.category}
              // onChange={handleChange}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <input className="button-editPopup" value="Edit Task" />
        {/* <input
          className="button-editPopup"
          value={() => {
            return completeBtnVal;
          }}
          onClick={() => {
            if (task.completed) {
              setTask({ completed: false });
            } else {
              setTask({ completed: true });
            }
          }}
        /> */}
        <input
          className="button-editPopup"
          value="DELETE"
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
