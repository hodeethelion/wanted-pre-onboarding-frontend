import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todopage = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("access_token");
    console.log(loggedInUser);
    if (!!loggedInUser) {
      setAuthenticated(loggedInUser);
    } else {
      navigate("/signin");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authenticated) {
    return null;
  } else {
    return (
      <div>
        <div style={{ fontWeight: 100, fontSize: 50, color: "orange" }}>
          Todo 페이지
        </div>
      </div>
    );
  }
};

export default Todopage;
