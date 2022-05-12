import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import FilterDropDown from "./FilterDropDown";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  function removeOneCharacter(index) {
    removeUser(index).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    });
  }

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((result) => {
      if (result) setCategories(result);
    });
  }, []);

  async function removeUser(index) {
    try {
      const response = await axios.delete(
        "http://localhost:5005/tasks/".concat(characters[index]["_id"])
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5005/tasks");
      return response.data.task_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5005/tasks", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function setTasksbyCategory(category) {
    try {
      if (category === "All") {
        const response = await axios.get("http://localhost:5005/tasks");
        setCharacters(response.data.task_list);
      } else {
        console.log("http://localhost:5005/tasks?category=".concat(category));
        const response = await axios.get(
          "http://localhost:5005/tasks?category=".concat(category)
        );
        setCharacters(response.data.task_list);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("http://localhost:5005/categories");
      return response.data.category_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
  }

  async function makePatchCall(person, index) {
    try {
      const response = await axios.patch(
        "http://localhost:5005/tasks/".concat(characters[index]["_id"]),
        person
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function editList(person, index) {
    makePatchCall(person, index).then((result) => {
      if (result && result.status === 201) {
        let newChar = [...characters];
        newChar[index] = person;
        setCharacters(newChar);
      }
    });
  }

  function updateCheck(index, person) {
    completeTask(index, person).then((result) => {
      if (result && result.status === 201) {
        let newChar = [...characters];
        newChar[index]["completed"] = !newChar[index]["completed"];
        setCharacters(newChar);
      }
    });
  }

  async function completeTask(index, complete) {
    try {
      complete.completed = !complete.completed;
      const response = await axios.patch(
        "http://localhost:5005/tasks/".concat(characters[index]["_id"]),
        complete
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // function completeOneTask(index, complete) {
  //   completeTask(index, complete);
  // }

  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <FilterDropDown
        characterData={characters}
        categories={categories}
        setTasksbyCategory={setTasksbyCategory}
      />
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        handleEdit={editList}
        completeTask={updateCheck}
      />
    </div>
  );
}

export default MyApp;
