import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = ({ todos, refreshTodos }) => {
  return (
    <div>
      <ul className="list-none">
      {todos.map((todo) => (
        <Todo key={todo.id} setting={todo} refreshTodos={refreshTodos} />
      ))}
      </ul>
    </div>
  );
};

export default TodoList;
