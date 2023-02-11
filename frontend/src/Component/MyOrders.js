import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { useState, useEffect } from "react";

let cartTotal = 0;
let shippingTotal = 0;
let total = 0;

const MyOrders = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(`${process.env.REACT_APP_API_URL}/orders/${user.id}`)

  useEffect( () => {
      console.log("hioii ther re isi")
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/${user.id}`)
      .then((data) => {
        const arr=[]
        const res = data.data.data.map((item => {
          const obj = JSON.parse(item.orderItems)
          obj.map((item) => arr.push(item))
        }))
        console.log("final array",arr)

        // const filteredarr = arr.map((item) => {

        // })
        setProducts(arr);
      })
      .catch((err) => {
        console.error(err)});
  }, []);

  return (
    <>{user  ? <div>
      <p className="text-[40px]">My Orders</p>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
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
                      {cartTotal= products.reduce((total,item) => {
                        return total + (item.cartQuantity * item.price)
                      },0)}
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Shipping 10%:
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {shippingTotal = 0.1 *cartTotal}
                    </td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total: 
                    </td>

                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {total= cartTotal +shippingTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
   
      </div>

      <hr />
      {/* {(total === 0) ? <h1> Sorry,there are no Orders */}
        {/* </h1> :  */}
      <div className="flex flex-wrap">
        {products &&
          products.slice(0, 10).map((item) => {
            return (
              <>
                <Link to={`../products/${item.id}`}>
                  <div
                    key={item.id}
                    className="card h-[373] w-[234px] inline-block text-center shadow-xl m-[20px] hover:mt-[-0.5px]"
                  >
                    <img
                      src={item.images}
                      alt={item.id + "img"}
                      className="p-[10px] h-[233px] w-[233px]"
                    />
                    <span className="p-[10px] text-orange-500">
                      {item.name}
                    </span>
                    <span className="p-[10px] text-orange-500 text-end">
                      ({item.cartQuantity})
                    </span>
                    <p className="pb-[10px]">Rs.{item.price}</p>
                  </div>
                </Link>
              </>
            );
          })}
      </div>
      </div>: 
      <div>
        <p>Sorry ,there are no Orders yet.</p>
      </div>}
    </>
  );

  // return (<>
  // hii</>)

}


export default MyOrders;