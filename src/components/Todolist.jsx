import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = ({ todos, refreshTodos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} setting={todo} refreshTodos={refreshTodos} />
      ))}
    </div>
  );
};

export default TodoList;
