/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import FilterDropDown from "./FilterDropDown";
import axios from "axios";
// const checkForm = require("./CheckForm");

function MyApp(props) {
  const [characters, setCharacters] = useState([]);
  const [username] = useState(props.username);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  useEffect(() => {
    fetchCategoriesofUser().then((result) => {
      if (result) setCategories(result);
    });
  }, []);

  function removeOneCharacter(index) {
    removeUser(index).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
        for (let i = 0; i < updated.length; i++) {
          document.getElementById("c" + i).checked = updated[i].completed;
        }
      }
    });
  }

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
      const response = await axios.get(
        "http://localhost:5005/tasks/?username=".concat(username)
      );
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

  async function setTasksbyCategoryandUserName(category, username) {
    try {
      if (sort === true) {
        sortList(username, category);
      } else {
        setTasksbyCategoryWithoutSort(username, category);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchCategoriesofUser() {
    try {
      const response = await axios.get(
        "http://localhost:5005/categories/?username=".concat(username)
      );
      console.log("here");
      console.log(
        "http://localhost:5005/categories/?username=".concat(username)
      );
      console.log(response.data.category_list);
      return response.data.category_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    console.log(person);
    makePostCall(person).then((result) => {
      if (result && result.status === 201) {
        if (sort) {
          sortList(username, category);
        }
        setCharacters([...characters, result.data]);
      }
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
        if (sort) {
          sortList(username, category);
        }
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

  async function removeComplete() {
    try {
      const response = await axios.delete(
        "http://localhost:5005/tasks/?username=".concat(username)
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeSortCall(username, category) {
    let response = null;
    try {
      if ((category == null) | (category === "All")) {
        response = await axios.get(
          "http://localhost:5005/sort?username=".concat(username)
        );
      } else {
        response = await axios.get(
          "http://localhost:5005/sort?category="
            .concat(category)
            .concat("&username=")
            .concat(username)
        );
      }
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeAll() {
    removeComplete().then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter(
          (character) => character.completed !== true
        );
        setCharacters(updated);
        for (let i = 0; i < updated.length; i++) {
          document.getElementById("c" + i).checked = updated[i].completed;
        }
      }
    });
  }

  function sortList(username, category) {
    console.log(username);
    makeSortCall(username, category).then((result) => {
      if (result && result.status === 200) {
        setCharacters(result.data.task_list);
      }
    });
  }

  async function setTasksbyCategoryWithoutSort(username, category) {
    try {
      if ((category == null) | (category === "All")) {
        const response = await axios.get(
          "http://localhost:5005/tasks/?username=".concat(username)
        );
        setCharacters(response.data.task_list);
      } else {
        const response = await axios.get(
          "http://localhost:5005/tasks/?username="
            .concat(username)
            .concat("&category=")
            .concat(category)
        );
        setCharacters(response.data.task_list);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState(false);

  return (
    <div>
      <div className="topnav">
        <a href="/" className="logout">
          Logout
        </a>
      </div>
      <div className="container">
        <Form username={username} handleSubmit={updateList} />
        <FilterDropDown
          username={username}
          characterData={characters}
          categories={categories}
          setCategory={setCategory}
          category={category}
          setTasksbyCategoryandUserName={setTasksbyCategoryandUserName}
        />
        <input
          type="button"
          value="Delete Completed Tasks"
          onClick={removeAll}
          className="delete-completed-button"
        />
        {sort && (
          <button
            className="sort-button2"
            onClick={() => {
              setSort(false);
              setTasksbyCategoryWithoutSort(username, category);
            }}
          >
            Remove Sort
          </button>
        )}
        <button
          className="sort-button"
          onClick={() => {
            setSort(true);
            sortList(username, category);
          }}
        >
          Sort by Earliest Due Date
        </button>
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
          handleEdit={editList}
          completeTask={updateCheck}
        />
      </div>
    </div>
  );
}

export default MyApp;
