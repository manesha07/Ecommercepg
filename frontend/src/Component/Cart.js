import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as notify from "../utils/notify.js"

import { useState, useEffect } from "react";
import { authService } from "../authentication/authentication";

let cartTotal = 0;
let shippingTotal = 0;
let total = 0;

const Cart = () => {
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem("cart"))
  const user = JSON.parse(localStorage.getItem("user"))

  console.log("cart items,",products)

  const cartCount = useSelector((state) => {
    console.log("this is nav state", state.cart.count);
    return state.cart.count;
  });
  // const [currentUser, setCurrentUser] = useState(undefined);
  // console.log("currenttt", currentUser);

  // useEffect(() => {
  //   const user = authService.getCurrentUser();
  //   console.log("userla", user);

  //   if (user) {
  //     setCurrentUser(user.currentUser);
  //   }
  // }, []);

  const handleCheckout = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/${user.id}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id:user.id,order_items:JSON.stringify(products),total_order_amount:Math.floor(total)}),
    })
      .then((response) => response.json())
      .then((data) => {
 // if data is received then the order is successful otherwise error is thrown
        if (data) {
          notify.success("placed of Orders")
          localStorage.removeItem('cart')
          navigate("/");
          window.location.reload();
        }
        else{
          console.log("error order",data)
          notify.error(data.details)
        }
      })
      .catch((error) => {
        notify.error(error)
      });
  }

  return (
    <>{products && user  ? <div>
      <p className="text-[40px]">Cart Items({cartCount})</p>
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
        {(total === 0) ? <h1> Please add to 
          Cart
        </h1> :    
         <button class=" bg-gray-800 text-white " onClick={handleCheckout}>
          Click here to Proceed to Checkout
        </button>}

      </div>

      <hr />

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
        <p>No products on cart</p>
      </div>}
    </>
  );
};

export default Cart;