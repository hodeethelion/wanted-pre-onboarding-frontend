import React, { useState } from "react";
import axios from "axios";
import { API } from "../utils/config";

const Todo = ({ setting, refreshTodos }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [isChecked, setIsChecked] = useState(setting.isCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedInput, setModifiedInput] = useState(setting.todo);

  const openChange = () => {
    setIsModifying(true);
  };

  const closeChange = () => {
    setIsModifying(false);
  };

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
        `${API.TODO}/${setting.id}`,
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

  const changeTodo = async (updateTodo) => {
    try {
      setIsLoading(true);
      console.log("updating name of todo ");
      console.log(updateTodo);
      const access_token = localStorage.getItem("access_token");
      const response = await axios.put(
        // `http://localhost:8000/todos/${setting.id}`,
        `${API.TODO}/${setting.id}`,
        {
          todo: updateTodo,
          isCompleted: setting.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "There was an error updating the todo:",
        error.response.data
      );
    } finally {
      refreshTodos();
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
        // `http://localhost:8000/todos/${setting.id}`,
        `${API.TODO}/${setting.id}`,
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
      refreshTodos();
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isModifying ? (
        // Modify mode
        <div>
          <input
            className="w-30 pl-3 rounded-xl focus:blue-800 border-spacing-2"
            data-testid="modify-input"
            value={modifiedInput}
            onChange={(e) => setModifiedInput(e.target.value)}
          />
          <button
            data-testid="submit-button"
            className="text-white bg-blue-400 rounded-full mr-2 mb-2 px-5"
            onClick={() => {
              // Logic to submit changes
              // 내가 하고 싶은것 눌렀을 때 새로운 todo 뜨도록
              console.log(modifiedInput);
              changeTodo(modifiedInput);
              closeChange();
            }}
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            className="text-white bg-rose-300 rounded-full mr-2 mb-2 px-5 "
            onClick={closeChange}
          >
            취소
          </button>
        </div>
      ) : (
        // Default display mode
        <li>
          <label>
            <input
              className="w-5 h-5"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <div
              className={`inline text-xl ml-2 mr-2 ${
                isChecked ? "line-through" : ""
              }`}
            >
              {setting.todo}
            </div>
            <button
              className="text-white bg-blue-400 rounded-full mr-2 mb-2 px-5"
              data-testid="modify-button"
              onClick={openChange}
            >
              수정
            </button>
            <button
              className="text-white bg-rose-500 rounded-full mr-2 mb-2 px-5 "
              data-testid="delete-button"
              onClick={deleteTodo}
            >
              삭제
            </button>
          </label>
        </li>
      )}
    </div>
  );
};

export default Todo;
