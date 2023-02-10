import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as userServices from "../services/index.js";

// Component for displaying detail of a user
const DetailUser = () => {
  const { id } = useParams(); // Component for displaying detail of a user
  console.log("this is iddetail user", id);
  const [users, setUsers] = useState("");
  const dispatch = useDispatch(); // Using useDispatch hook to access the dispatch method

  // Using useEffect hook to fetch data of the user with the given id
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`) // Fetching data from the API endpoint
      .then((res) => res.json())
      .then((res) => {
        console.log("this", res);
        setUsers(res.data); // Updating the state with the response data
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {" "}
      {/* Checking if the data has been fetched and not empty */}
      {users && (
        <div className="rounded-md shadow-2xl mt-[20px]">
          <div className="user flex flex-row ">
            <div className="description ml-[20px]">
              <h1 className="text-[40px]">{users.name}</h1>
              <p>{users.username}</p>
              <p className="text-orange-500">{users.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailUser;
