import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleChange = (event, inputType) => {
    switch(inputType){
      case 'username':
        setUsername(event.target.value)
      case 'password':
        setPassword(event.target.value)
      default:
        setEmail(event.target.value)
    }
  }

  const handleSubmit = async () => {
    const data = {
      username,
      email,
      password
    }

    await axios.post('http://94.74.86.174:8080/api/register', data)
        .then(response => {
            navigate('/login')
        })
        .catch(err => alert(err))
  }

  const handleNavigate = () => navigate('/login')

  return (
    <Fragment>
      <h1>Register</h1>
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
          <label>Email</label>
          <input
            name="email"
            onChange={(e) => handleChange(e, "email")}
            type="text"
            placeholder="Insert email..."
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
          Register
        </button>
        <p>
          Already have an account? <a onClick={handleNavigate}>Login</a>
        </p>
      </form>
    </Fragment>
  );
};

export default Register;
