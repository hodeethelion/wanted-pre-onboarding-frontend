import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signuppage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
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
    e.preventDefault();
    axios.post("http://localhost:8000/auth/signup", form)
    .then((response) => {
        console.log(response);
        if (response.status === 201){
            navigate('/signin');
        }
    })
    .catch((err) => {
        if (err.response && err.response.status === 400){
            alert('이미 존재하는 이메일입니다 다시 만들어 주세요!');
            // Resetting form state to its initial values
            setForm({
                email: "",
                password: "",
            });
        }
    });
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p style={{ fontWeight: 100, color: "blue", fontSize: 50 }}>sign up</p>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            data-testid="email-input"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
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
            }}
          />
        </div>
        <div>
          <button type="submit" data-testid="signup-button" disabled={!isValid}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signuppage;
