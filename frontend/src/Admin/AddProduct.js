import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../authentication/authHeader.js';
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js"
import axios from "axios";


export default function AddProduct() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
     const [image, setImage] = useState(null);
    const [price,setPrice] =useState("");
    const [category,setCategory] =useState("");
    const [stock,setStock] = useState("");
    const navigate = useNavigate();
    console.log("authHeader inside addProduct",authHeader())

      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        console.log(image,"im imahe")
      };

  const handleSubmit = (event) => {
    event.preventDefault();
  //  const adminToken = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    console.log("form",formData)
    formData.append("name", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("image", image);
    console.log(image)

   
      axios
        .post(`${process.env.REACT_APP_API_URL}/products`, formData, {
          method: "POST", // or 'PUT'
       

          headers: {
            "Content-Type": "multipart/form-data",
     
           
          },
        })
        .then((response) => response.data)

        .then((data) => {
          console.log(data.details);
          if (!data.details) {
          // if (data.message) {
            console.log("Success:", data);
            notify.success("Added");
          } else {
            notify.error(data.details);
          }
        })
        .catch((error) => {
          notify.error(error);
          console.log("Error:", error);
        });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="shadow-xl mx-auto w-[300px] p-[30px] mt-[40px] rounded-md"
      >
        <h1 className="text-[30px] text-center mb-[20px]">Add Product</h1>

        <label for="title" className="text-gray-600">
          Product Name
        </label>
        <input
          type="text"
          name="title"
          placeholder={"Product Name"}
          value={title || ""}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label for="description" className="text-gray-600">
          {" "}
          Product Description
        </label>
        <input
          type="text"
          name="description"
          placeholder={"Description"}
          value={description || ""}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {/* <div>
          <label for="image" className="text-gray-600">
            {" "}
            Product Image
          </label>
          <input
            type="text"
            name="image"
            placeholder={"image"}
            value={image || ""}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div> */}

        <div>
          <label for="image" className="text-gray-600">
            Product Image
          </label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        <div>
          <label for="price" className="text-gray-600">
            {" "}
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder={"Price"}
            value={price || ""}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label for="category" className="text-gray-600">
            {" "}
            Product Category
          </label>
          <input
            type="text"
            name="category"
            placeholder={"Category"}
            value={category || ""}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div>
          <label for="stock" className="text-gray-600">
            {" "}
            Product Stock
          </label>
          <input
            type="number"
            name="stock"
            placeholder={"Stock"}
            value={stock || ""}
            onChange={(e) => {
              setStock(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="shadow-md p-[5px] w-full mb-[20px] mt-[10px] text-white rounded-md bg-green-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer autoClose={4000} />
    </>
  );
}
