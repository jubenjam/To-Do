import { useState } from "react";
import EditPopup from "./EditPopup.js";
import CheckForm from "./CheckForm";
import "./Table.css";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Task</th>
        <th>Complete By</th>
        <th>Category</th>
        <th></th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState(null);

  const openPopup = (id, task, date, category, index) => {
    let newDate = JSON.stringify(new Date(date));
    newDate = newDate.slice(1, 11);
    setSelected({
      id: id,
      task: task,
      date: newDate,
      category: category,
      index: index
    });
    setShow(true);
  };

  const closePopup = () => {
    setSelected(null);
    setShow(false);
  };

  var rows = props.characterData.map((row, index) => {
    var date = new Date(row.date.replace(/-/g, "/").replace(/T.+/, ""));
    var strikeClass = "none";

    if (row.completed) {
      strikeClass = "completed";
    }

    return (
      <tr key={index} className={strikeClass}>
        <td>
          {
            <CheckForm
              completeTask={props.completeTask}
              taskData={props.characterData}
              index={index}
            />
          }
        </td>
        <td>{row.task}</td>
        <td>{date.toDateString()}</td>
        <td>{row.category}</td>
        <td>
          <input
            type="button"
            value="Edit"
            onClick={() =>
              openPopup(row._id, row.task, date, row.category, index)
            }
          />
          {show && (
            <EditPopup
              handleClose={closePopup}
              selectedRow={selected}
              removeCharacter={props.removeCharacter}
              setShow={setShow}
              handleEdit={props.handleEdit}
            />
          )}
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
        handleEdit={props.handleEdit}
        completeTask={props.completeTask}
      />
    </table>
  );
}
export default Table;
