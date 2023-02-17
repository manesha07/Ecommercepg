import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./Nav";

import axios from "axios";

const ProductsNav = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState(""); // state variable searchTerm which holds an empty string.
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

  // It takes the input value of the search bar and sets it as the state value of searchTerm
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="">
        <p className="text-4xl leading-8 font-semibold mb-12 text-slate-700 md:text-left">
          Products
        </p>
        <div class="relative text-gray-600">
          <input
            class="bg-white h-10 px-5 pr-10 rounded-full  focus:outline-none w-full"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
            <svg
              class="h-4 w-4 fill-current"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.02 13 9.44 12.44 10.56 11.56L15.21 16.21C15.34 16.34 15.5 16.41 15.66 16.41C15.91 16.41 16.08 16.24 16.08 16C16.08 15.85 16.01 15.66 15.88 15.53L11.22 10.88C12.19 9.78 13 8.39 13 6.5C13 2.91 10.09 0 6.5 0ZM6.5 2C9.54 2 12 4.46 12 7.5C12 10.54 9.54 13 6.5 13C3.46 13 1 10.54 1 7.5C1 4.46 3.46 2 6.5 2Z"></path>
            </svg>
          </button>
        </div>
        <hr />
        <div className="sm:text-center md:flex md:flex-wrap md:text-center md:justify-center">
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
                        process.env.REACT_APP_API_URL +
                        "/uploads/" +
                        item.images
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
          <div>
            <button
              onClick={previousPage}
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mx-2"
            >
              Previous
            </button>
            {Array.from(
              {
                length: Math.ceil(filteredProducts.length / productsPerPage),
              },
              (_, index) => {
                const pageNumber = index + 1;
                const hidePageNumber =
                  pageNumber > currentPage + 1 || pageNumber < currentPage - 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`${
                      pageNumber === currentPage
                        ? "bg-slate-600 text-white"
                        : "bg-white text-gray-500 hover:text-slate-700"
                    } px-4 py-2 border border-gray-300 rounded-md shadow-sm mx-1 ${
                      hidePageNumber ? "hidden" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
            )}

            {/* {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md mx-2 ${
                  currentPage === index + 1
                    ? "bg-slate-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            )
          )} */}
            {/* {currentPage > 1
            ? `${currentPage - 1}, ${currentPage}, ${currentPage + 1}`
            : `${currentPage}, ${currentPage + 1}, ${currentPage + 2}`} */}
            <button
              onClick={nextPage}
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mx-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsNav;
