import { useState } from "react";

function CheckForm(props) {
  const [complete, setComplete] = useState({
    completed: props.taskData[props.index].completed
  });

  function handleCheck() {
    setComplete({
      completed: document.querySelector('input[id="c' + props.index + '"]')
        .checked
    });
    props.completeTask(props.index, complete);
  }

  return (
    <form>
      <input
        type="checkbox"
        name="cx"
        id={"c" + props.index}
        onChange={handleCheck}
        defaultChecked={complete.completed}
      />
    </form>
  );
}

export default CheckForm;
