import React, { useState, useEffect } from "react";
import Todo from "./Todo";

// const Todolist = () => {
//   const [todos, setToDos] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:8000/todos", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setToDos(data);
//         console.log(data);
//       })
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   return (
//     <div>
//       {todos.map((todo) => (
//         <Todo key={todo.id} setting={todo}/>
//       ))}
//     </div>
//   );
// };

const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} setting={todo}/>
      ))}
    </div>
  );
};

export default TodoList;
