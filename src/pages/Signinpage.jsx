import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signinpage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

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
    axios.post("http://localhost:8000/auth/signin", form).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data && res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
        }
        alert("로그인 성공하였습니다!");
        navigate("/todo");
      }
    }).catch((err) => {
      if (err.response && err.response.status === 400){
        alert('이메일 혹은 비밀번호가 잘못되었습니다! 다시 로그인해주세요! ')
      }
    });
  };

  return (
    <div>
      <p style={{ fontWeight: 100, color: "red", fontSize: 50 }}>
        sign in page
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
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
        <div>
          <label htmlFor="password">password</label>
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
        <div>
          <button type="submit" data-testid="signin-button" disabled={!isValid}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signinpage;
