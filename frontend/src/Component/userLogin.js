import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js"
import authHeader from '../authentication/authHeader.js';

// component to display login for User
const Login = () => {
  const [username,setUsername] =useState("");
  const [password,setPassword] =useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  console.log("user yei ho",user)
  const handleSubmit = (event) => {
    // Event handler for submitting the form
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/userLogin`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.user) {
          console.log("bhitra:", data);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          notify.success("Login"); // Show a success notification
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        notify.error(error);
        console.error("Error:", error); // Show an error notification with the error message
      });
  }
  return (
    <>
        <form onSubmit={handleSubmit} className="login shadow-xl mx-auto w-[300px]  p-[30px] mt-[40px] rounded-md">
          <h1 className="text-[30px] text-center mb-[20px]">Login</h1>
          <label for ="username" className='text-gray-600'> Username</label>
          <input  type="text" id="username" value={username} placeholder="Enter Username" onChange={(e)=>{setUsername(e.target.value)}} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"/>
          <label for ="password" className='text-gray-600'>Password</label>
          <input type="password" id="password" value={password} placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
          <Link to="#"><p className='text-blue-300 mt-[-15px] mb-[10px]'>Forgot Password?</p></Link>
           <button className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] text-white rounded-md bg-green-600">LOGIN</button>
        </form>
        <ToastContainer autoClose={4000}/>
        </>
  )
}

export default Login