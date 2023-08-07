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
        <div className="w-screen h-screen flex justify-center items-center bg-blue-300">
          <div className="w-1/3 h-2/3 flex flex-col justify-center items-center bg-wantedCyan rounded-3xl">
          <h1 className="text-3xl py-16 font-bold">To do</h1>
            <Addbutton refreshTodos={fetchToDos} />
            <Todolist todos={todos} refreshTodos={fetchToDos} />
          </div>
        </div>
      </div>
    );
  }
};

export default Todopage;
