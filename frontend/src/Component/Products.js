import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const cartCount = useSelector((state) => {
    console.log("this is state", state);
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((data) => {
        console.log("yo data", data);
        setProducts(data.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <p className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Products
      </p>
      <hr />
      <div className="flex flex-wrap">
        {currentProducts.map((item) => {
          return (
            <>
              <Link to={`/products/${item.id}`}>
                <div
                  key={item.id}
                  className="card h-[373] w-[234px] inline-block text-center shadow-xl m-[20px] hover:mt-[-0.5px]"
                >
                  {" "}
                  <img
                    src={
                      process.env.REACT_APP_API_URL + "/uploads/" + item.images
                    }
                    alt={item.id + "img"}
                    className="p-[10px] h-[233px] w-[233px]"
                  />
                  <p className="p-[10px] text-orange-500">{item.name}</p>
                  <p className="pb-[10px]">Rs.{item.price}</p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
      <div className="p-[10px]">
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  i + 1 === currentPage ? "bg-blue-500" : ""
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
    </>
  );
};

export default Products;
