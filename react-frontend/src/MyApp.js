import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
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

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
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

  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}

export default MyApp;
