//SHIFT alt F : formate
//sHIFT CTRL k : CONSOLE LOG
//Remember to start backend with:  npx nodemon backend.js

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function FilterDropDown(props) {
  const handleSelect = (eventkey, e) => {
    console.log(props.categories);
    console.log(e.target.text);
    console.log(typeof e.target.text);
    props.setCategory(e.target.text);
    props.setTasksbyCategoryandUserName(e.target.text, props.username);
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Category Filter"
      className = "inline-block"
      onSelect={handleSelect}
    >
      <Dropdown.Item key="None">All</Dropdown.Item>
      {props.categories.map((item) => {
        return (
          <Dropdown.Item key={item} eventkey="Not needed">
            {item}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

export default FilterDropDown;
