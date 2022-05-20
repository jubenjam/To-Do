/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import FilterDropDown from "./FilterDropDown";
import axios from "axios";

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

  // async function setTasksbyCategory(category) {
  //   try {
  //     if (category === "All") {
  //       const response = await axios.get(
  //         "http://localhost:5005/tasks/?username=".concat(username)
  //       );
  //       setCharacters(response.data.task_list);
  //     } else {
  //       console.log("http://localhost:5005/tasks?category=".concat(category));
  //       const response = await axios.get(
  //         "http://localhost:5005/tasks?category=".concat(category)
  //       );
  //       setCharacters(response.data.task_list);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  //http://localhost:5005/tasks/?username=dustint121&category=School
  async function setTasksbyCategoryandUserName(category, username) {
    try {
      if (category === "All") {
        const response = await axios.get(
          "http://localhost:5005/tasks/?username=".concat(username)
        );
        setCharacters(response.data.task_list);
      } else {
        console.log(
          "http://localhost:5005/tasks/?username="
            .concat(username)
            .concat("&category=")
            .concat(category)
        );
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

  // async function fetchCategories() {
  //   try {
  //     const response = await axios.get("http://localhost:5005/categories");
  //     return response.data.category_list;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

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
      <Form username={username} handleSubmit={updateList} />
      <FilterDropDown
        username={username}
        characterData={characters}
        categories={categories}
        setTasksbyCategoryandUserName={setTasksbyCategoryandUserName}
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
