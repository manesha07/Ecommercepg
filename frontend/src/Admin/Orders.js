import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js"
import "./admin.css";
import authHeader from '../authentication/authHeader.js';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data)
        const arr = []
        const res = data.data.map((item1) => {
          console.log("item1", item1)
          const obj = JSON.parse(item1.orderItems)
          obj.map((item) => arr.push({ ...item, 'userId': item1.userId }))
        }

        );
        setProducts(arr);
        console.log("arr", arr)
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  const Delete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.data);
        fetch(`${process.env.REACT_APP_API_URL}/users`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.details) {
              console.log("ddd", data.data);
              setProducts(data.data);
              notify.success("deleted");
            } else {
              notify.error(data.details);
            }
          });
      })
      .catch((error) => {
        notify.error(error);
        console.error("Error:", error);
      });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = products.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {" "}
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded">
        <Link to="/userRegister">Add Users</Link>
      </button> */}
      <div style={{ width: "100%", overflow: "auto" }} className="sm:w-[320px] md:w-[600px] lg:w-[1400px] overflow-auto max-h-[600px] pt-[20px]">
        <table class="table-auto w-full text-center text-[#4A4C4D] bg-[#EBEDF2] border-gray-200 ">
          <thead class="font-medium">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Stock</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Edit</th>
              <th class="px-4 py-2">Delete</th>
            </tr>
          </thead>
          {products &&
            products.map((item, i) => {
              return (
                <>
                  <tr key={item.i} class="hover:bg-[#DCDCDC]">
                    <td>{item.name}</td>
                    <td>{item.cartQuantity}</td>
                    <td>{item.price}</td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {" "}
                        <Link to={`../orders/${item.userId}`}> Edit </Link>
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => {
                          Delete(item.userId);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
      <div className="p-[10px]">
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(products.length / usersPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${i + 1 === currentPage ? "bg-blue-500" : ""
                  }p-2`}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                <button
                  onClick={() => paginate(i + 1)}
                  className="page-link"
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default Orders;