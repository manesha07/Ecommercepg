import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from "./Nav";
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import PerfectScrollbar from 'perfect-scrollbar';

import { useState, useEffect } from "react";

let cartTotal = 0;
let shippingTotal = 0;
let total = 0;

const MyOrders = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(`${process.env.REACT_APP_API_URL}/orders/${user.id}`)
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("hioii ther re isi")
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/${user.id}`)
      .then((data) => {
        const arr = []
        const res = data.data.data.map((item) => {
          const obj = JSON.parse(item.orderItems)
          obj.map((item) => arr.push(item))
        }
        )
        console.log("final array", arr)

        // Loop through the values array
        const uniqueValues = {};

        // Loop through the values array
        arr.forEach(obj => {
          // Generate a unique key for the object based on its id and name
          const key = obj.id;

          // If the object is not already in the uniqueValues object, add it with a count of 1
          if (!uniqueValues[key]) {
            uniqueValues[key] = obj;
            uniqueValues[key].orderQuantity = obj.cartQuantity;
            // console.log(uniqueValues)
          }
          // If the object is already in the uniqueValues object, increment its count
          else {
            uniqueValues[key].cartQuantity = uniqueValues[key].cartQuantity + obj.cartQuantity;
            uniqueValues[key].orderQuantity = uniqueValues[key].orderQuantity + obj.cartQuantity;
            // console.log(uniqueValues)
          }
        });

        // Convert the uniqueValues object back into an array of objects
        const uniqueValuesArray = Object.values(uniqueValues);
        console.log("unique", uniqueValuesArray)
        setProducts(uniqueValuesArray);
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  return (
    <><Nav />
      {user ?
        <div>

          <div className="mx-auto w-[600px]  my-[20px] border-slate-400 shadow-xl">
            <p className="text-[30px]">My Orders</p>
            <hr className="color-black pb-[10px]" />
            <div className="max-h-[400px] hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-gray-300 overflow-y:hidden hover:overflow-y-scroll" >
              {products &&
                products.slice(0, 10).map((item) => {
                  return (
                    <>
                      <Link to={`../products/${item.id}`}>
                        <div
                          key={item.id}
                          className="w-[600px] py-[10px]  inline-block text-center m-auto hover:mt-[-0.5px] flex items-center"
                        >
                          <img
                            src={process.env.REACT_APP_API_URL + "/uploads/" + item.images}
                            alt={item.id + "img"}
                            className=" h-[80px] w-[80px] pl-[10px]"
                          />
                          <div className="text-left pl-[18px]">
                            <p className="text-gray-900 text-[20px]">
                              {item.name}
                            </p>
                            <p className=" text-gray-600 text-[15px]">
                              Rs.{item.price}  X {item.cartQuantity}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <hr className=" border-gray-200" />
                    </>
                  );
                })}
            </div>
            <hr className=" border-gray-200" />
            <div className="flex justify-between px-[20px] text-[18px] text-gray-600 pt-[15px]">
              <p > SubTotal</p>
              <p > {cartTotal = products.reduce((total, item) => {
                return total + (item.cartQuantity * item.price)
              }, 0)}</p>
            </div>
            <div className="flex justify-between px-[20px] text-[18px] text-gray-600 pb-[15px] pt-[]">
              <p > Shipping 10%</p>
              <p >+{shippingTotal = 0.1 * cartTotal}</p>
            </div>
            <hr className="border-gray-900 py-[8px]" />
            <div className="flex justify-between px-[20px] pb-[20px] text-[25px] text-gray-700">
              <p > Total</p>
              <p >{total = cartTotal + shippingTotal}</p>
            </div>
          </div>
          {/* {(total === 0) ? <h1> Sorry,there are no Orders */}
          {/* </h1> :  */}
          {/* <div class="flex flex-col w-[2/3]">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <div style={{ overflow: "auto" }} className="sm:w-[320px] md:w-[600px] lg:w-[700px] m-auto">
                    <table class="min-w-full text-center w-[2/3]">
                      <thead class="border-b bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4"
                          >
                            Payment Details
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4"
                          >
                            Payment Calculation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Sub Total:
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {cartTotal = products.reduce((total, item) => {
                              return total + (item.cartQuantity * item.price)
                            }, 0)}
                          </td>
                        </tr>
                        <tr class="bg-white border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Shipping 10%:
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {shippingTotal = 0.1 * cartTotal}
                          </td>
                        </tr>
                        <tr class="bg-white border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Total:
                          </td>

                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {total = cartTotal + shippingTotal}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div> :
        <div>
          <p>Sorry ,there are no Orders yet.</p>
        </div>}
    </>
  );

  // return (<>
  // hii</>)

}


export default MyOrders;