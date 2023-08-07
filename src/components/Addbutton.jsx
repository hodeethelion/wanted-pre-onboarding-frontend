import React, { useState } from "react";
import axios from "axios";

const Addbutton = ({ refreshTodos }) => {
  const [todo, setToDo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "http://localhost:8000/todos",
        { todo },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("todo가 한 개 추가되었습니다!");
          refreshTodos(); // Re-fetch todos after adding
          setToDo("");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-30 pl-3 rounded-xl focus:blue-800 border-spacing-2"
          type="text"
          id="text"
          value={todo}
          onChange={(e) => {
            setToDo(e.target.value);
          }}
          data-testid="new-todo-input"
        />
        <div className="w-10 inline">
          <button
            className="text-white bg-blue-700 rounded-full mr-2 mb-2 px-6"
            data-testid="new-todo-add-button"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addbutton;
