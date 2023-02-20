import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js"
import * as Sentry from "@sentry/react";
import Nav from "./Nav";

const user = JSON.parse(localStorage.getItem("token"));

// This component is login for admin
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("received", data)
        // if token is received then the login is successful otherwise error is thrown
        if (data.data.token) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          localStorage.setItem("token", JSON.stringify(data.data.token));
          if (notify) {
            notify.success("Login");
          }
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
        else {
          console.log("login admin", data)
          notify.error(data.details)
        }
      })
      .catch((error) => {
        notify.error("Please enter correct username or password")

        Sentry.captureException(error)
      });
  }
  return (
    <>
      <Nav />
      <form
        onSubmit={handleSubmit}
        className="login shadow-xl mx-auto w-[300px]  p-[30px] mt-[40px] rounded-md"
      >
        <h1 className="text-[30px] text-center mb-[20px]">Login</h1>
        <label for="username" className="text-gray-600">
          {" "}
          Username
        </label>
        <input
          data-testid="login-user"
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        <label for="password" className="text-gray-600">
          Password
        </label>
        <input
          type="password"
          data-testid="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        <Link to="#">
          <p className="text-blue-300 mt-[-15px] mb-[10px]">Forgot Password?</p>
        </Link>
        <button
          data-testid="submit"
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] text-white rounded-md bg-green-600"
        >
          LOGIN
        </button>
      </form>
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default Sentry.withProfiler(Login);