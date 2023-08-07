import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/config";

const Signinpage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

  // 리다이렉트
  useEffect(() => {
    const loggedInUser = localStorage.getItem("access_token");
    console.log(loggedInUser);
    if (!!loggedInUser) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const re = /@/;
    return re.test(email);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (validateEmail(form.email) && validatePassword(form.password)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (e) => {
    // console.log(e)
    e.preventDefault();
    console.log("form: ", form);
    axios
      .post(
        // "http://localhost:8000/auth/signin",
        `${API.SIGNIN}`,
        form
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data && res.data.access_token) {
            localStorage.setItem("access_token", res.data.access_token);
          }
          alert("로그인 성공하였습니다!");
          navigate("/todo");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("이메일 혹은 비밀번호가 잘못되었습니다! 다시 로그인해주세요! ");
        }
      });
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center bg-blue-300">
        <div className="w-1/3 h-2/3 flex flex-col justify-center items-center bg-wantedCyan rounded-3xl">
          <h1 className="text-3xl py-16 font-bold">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <p className="w-[5rem] text-xl">이메일</p>
              <input
                type="email"
                id="email"
                value={form.email}
                data-testid="email-input"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  console.log(e.target.value);
                }}
              />
            </div>
            {!form.email.includes("@") && (
              <div className="flex items-center justify-center py-1">
                <p className="text-sm text-blue-800 font-bold">
                  {" "}
                  이메일에 @ 포함해주세요!
                </p>
              </div>
            )}
            <div>
              <div className="flex flex-row">
                <p className="w-[5rem] text-xl" htmlFor="password">
                  비밀번호
                </p>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  data-testid="password-input"
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    console.log(form);
                  }}
                />
              </div>
              {form.password.length < 8 && (
                <div className="flex items-center justify-center py-1">
                  <p className="text-sm text-blue-800 font-bold">
                    {" "}
                    비밀번호는 최소 8자리 입니다!{" "}
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-center items-center mt-10">
                <button
                  type="button"
                  data-testid="signin-button"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-2xl rounded-full px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signinpage;
