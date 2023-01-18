import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token) navigate('/')
  }, [])

  const handleChange = (event, inputType) => {
    switch (inputType) {
      case "username":
        setUsername(event.target.value);
      case "password":
        setPassword(event.target.value);
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const data = {
      username,
      password,
    };

    if(!username && !password) return alert('Form cannot be empty')

    await axios
      .post("http://94.74.86.174:8080/api/login", data)
      .then((response) => {
        localStorage.setItem("jwt", response.data.data.token)
        navigate('/')
      })
      .catch((err) => alert("Wrong username/password"));
  };

  const handleNavigate = ()  => navigate('/register')

  return (
    <Fragment>
      <h1>Login</h1>
      <form>
        <div>
          <label>Username</label>
          <input
            name="username"
            onChange={(e) => handleChange(e, "username")}
            type="text"
            placeholder="Insert username..."
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            onChange={(e) => handleChange(e, "password")}
            type="password"
            placeholder="Insert password..."
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
        <p>
          Didn't have account? <a onClick={handleNavigate}>Register</a>
        </p>
      </form>
    </Fragment>
  );
};

export default Login;
