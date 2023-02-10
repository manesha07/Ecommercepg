import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as notify from "../utils/notify.js";
import authHeader from "../authentication/authHeader.js";

//checkoutform is diaplayed when the user orders the items/products
const CheckoutForm = () => {
  const [fullname, setFullname] = useState(""); // State for storing the full name of the user
  const [email, setEmail] = useState(""); // State for storing the email of the user
  const [address, setAddress] = useState(""); // State for storing the address of the user
  const [phone, setPhone] = useState(""); // State for storing the phone of the user

  const handleSubmit = (event) => {
    // Event handler for submitting the form
    event.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to the server with the form data
    fetch(`${process.env.REACT_APP_API_URL}/userRegister/Checkout`, {
      method: "POST", // or 'PUT'      // The HTTP method for sending the request
      headers: {
        "Content-Type": "application/json", // Specifying the request body type
      },
      body: JSON.stringify({
        // Stringify the form data as a JSON object
        name: fullname,
        address: address,
        phone: phone,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.details) {
          // Check if the request was successful
          console.log("Success:", data);
          notify.success("Ordered"); // Show a success notification
        } else {
          notify.error(data.details); // Show an error notification with the error message
        }
      })
      .catch((error) => {
        notify.error(error);
        console.error("Error:", error); // Show an error notification with the error message
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="login shadow-xl mx-auto w-[300px]  p-[30px] mt-[40px] rounded-md"
      >
        <h1 className="text-[30px] text-center mb-[20px]">Checkout Details:</h1>
        <label for="fullname" className="text-gray-600">
          {" "}
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          placeholder="Enter fullname"
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        <label for="username" className="text-gray-600">
          {" "}
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        {/* <label for="email" className="text-gray-600">
          {" "}
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Enter Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        /> */}
        <label for="username" className="text-gray-600">
          {" "}
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          placeholder="Enter Phone Number"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        <label for="username" className="text-gray-600">
          {" "}
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          placeholder="Enter Your Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] rounded-md"
        />
        <button
          type="submit"
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] text-white rounded-md bg-green-600"
        >
          Order Now
        </button>
      </form>
      <ToastContainer autoClose={4000} />
    </>
  );
}


export default CheckoutForm;
