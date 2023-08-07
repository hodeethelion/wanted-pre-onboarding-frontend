import React, { useState } from "react";
import axios from "axios";

const Todo = ({ setting, refreshTodos }) => {
  // console.log(setting);
  const [isChecked, setIsChecked] = useState(setting.isCompleted);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    await updateTodo(newCheckedState);
  };

  const updateTodo = async (newCheckedState) => {
    try {
      setIsLoading(true);
      console.log("updating checkbox");
      const access_token = localStorage.getItem("access_token");
      const response = await axios.put(
        `http://localhost:8000/todos/${setting.id}`,
        {
          todo: setting.todo,
          isCompleted: newCheckedState,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("There was an error updating the todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async () => {
    console.log("삭제");
    try {
      setIsLoading(true);
      console.log("deleting todo");

      const access_token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `http://localhost:8000/todos/${setting.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      refreshTodos();
    }
  };

  return (
    <div>
      <li>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <span>{setting.todo}</span>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button" onClick={deleteTodo}>
            삭제
          </button>
        </label>
      </li>
    </div>
  );
};

export default Todo;
