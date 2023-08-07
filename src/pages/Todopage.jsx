import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Addbutton from "../components/Addbutton";
import Todolist from "../components/Todolist";

const Todopage = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [todos, setToDos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("access_token");
    // console.log(loggedInUser);
    if (!!loggedInUser) {
      setAuthenticated(loggedInUser);
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchToDos = () => {
    fetch("http://localhost:8000/todos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToDos(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Call fetchToDos when the component mounts
  useEffect(fetchToDos, []);

  if (!authenticated) {
    return null;
  } else {
    return (
      <div>
        <div style={{ fontWeight: 100, fontSize: 50, color: "orange" }}>
          Todo 페이지
        </div>
        <Addbutton refreshTodos={fetchToDos} />
        <Todolist todos={todos} refreshTodos={fetchToDos} />
      </div>
    );
  }
};

export default Todopage;
