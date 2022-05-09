import { useState } from "react";

function CheckForm(props) {
  const [complete, setComplete] = useState({
    id: props.taskData[props.index]._id,
    completed: props.taskData[props.index].completed
  });

  function handleCheck() {
    setComplete({
      completed: document.querySelector('input[id="c' + props.index + '"]')
        .checked
    });
    props.handleSubmit(props.index, complete.completed);
  }

  return (
    <form>
      <input
        type="checkbox"
        name="cx"
        id={"c" + props.index}
        value={true}
        onClick={handleCheck}
        checked={complete.completed}
      />
    </form>
  );
}

export default CheckForm;
