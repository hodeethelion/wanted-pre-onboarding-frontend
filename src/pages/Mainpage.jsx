import React from "react";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center bg-blue-300">
        <div className="w-1/3 h-2/3 flex flex-col justify-center items-center bg-wantedCyan rounded-3xl">
          <h1 className="text-3xl py-16 font-bold"> 원티드 프리온보딩 사전 과제 </h1>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-2xl rounded-full px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-2xl rounded-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
