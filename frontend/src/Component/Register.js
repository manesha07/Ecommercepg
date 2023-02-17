import React from 'react'
import { useState } from 'react';
import Nav from './Nav';
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js";
import { useNavigate } from 'react-router-dom';

//Register admin and save the details of admin in the backend
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");


  const handleSubmit = (event) => {
    console.log("register form data", { name: fullname, username: username, password: password, email: email })
    event.preventDefault();
    if (password !== repassword) { console.log("error") }
    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST', // or 'PUT'
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullname, username: username, password: password, email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.details) {
          console.log("Success:", data);
          if (notify) {
            notify.success("registered");
          }
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
        else {
          notify.error(data.details)
        }
      })
      .catch((error) => {
        notify.error(error)
        console.error('Error:', error);
      });
  }

  return (
    <><Nav />
      <form onSubmit={handleSubmit} className="login shadow-xl mx-auto w-[300px]  p-[30px] mt-[40px] rounded-md">
        <h1 className="text-[30px] text-center mb-[20px]">Register</h1>
        <label for="fullname" className='text-gray-600'> Full Name</label>
        <input type="text" id="fullname" value={fullname} placeholder="Enter fullname" onChange={(e) => { setFullname(e.target.value) }} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
        <label for="username" className='text-gray-600'> Email</label>
        <input type="email" id="email" value={email} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
        <label for="email" className='text-gray-600'> Username</label>
        <input type="text" id="username" value={username} placeholder="Enter Username" onChange={(e) => { setUsername(e.target.value) }} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
        <label for="password" className='text-gray-600'>Password</label>
        <input type="password" id="password" value={password} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
        <label for="repassword" className='text-gray-600'>Repeat Password</label>
        <input type="password" id="repassword" value={repassword} placeholder="Enter Password Again" onChange={(e) => { setRepassword(e.target.value) }} className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md" />
        <button type="submit" className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] text-white rounded-md bg-green-600">REGISTER</button>
      </form>
      <ToastContainer autoClose={4000} />
    </>
  )
}

export default Register