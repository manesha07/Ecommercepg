import img from "../image/avif.jpg"
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link,useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { authService } from "../authentication/authentication";
import { useParams } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [cartLength,setCartLength] = useState(0);
  const navigate = useNavigate();
   const cartCount =useSelector(state => {
     return state.cart.count})
       const [currentUser, setCurrentUser] = useState(undefined);

 useEffect(() => {
   const user = authService.getCurrentUser();
   console.log("userla",user)

   if (user) {
     setCurrentUser(user.currentUser);
   }
   
 }, []);

 useEffect(()=> {
   const cart = JSON.parse(localStorage.getItem("cart"))
   const user = JSON.parse(localStorage.getItem("user"))
   const cartCounts = cart && cart.reduce((acc,item) => {
     return acc + item.cartQuantity
   },0)
   setCartLength(cartCounts)
 },[cartCount])

 const logOut = () => {
   authService.logout();
   navigate("/")
   window.location.reload();
 };  

const [users, setUsers] = useState();
const [showDropdown, setShowDropdown] = useState(false);
const [showDropdown2, setShowDropdown2] = useState(false);

  return (
    <nav className="bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
            <img
                src={img}
                alt="hero img"
                className="h-[70px] w-[70px] pt-[5px]"
              />
            </a>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
          <ul className="hidden md:inline-block md:flex text-gray-800 md:justify-end md:py-[20px] md:items-center">
            <li className="md:p-[10px] hover:bg-[orange] hover:text-black ">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="p-[10px] hover:bg-[orange] ">
              {" "}
              <Link to="/products"> Our Products </Link>
            </li>
            {/* if customer is logged in then cart is shown, if admin is logged in dashboard is shown */}
            {currentUser ? (
              currentUser === "user" ? (
                <>
                  <Link to="/cart">
                    <li className="p-[10px] hover:bg-[orange] ">
                      <Link to="/cart"> Cart({cartLength}) </Link>
                    </li>
                  </Link>
                  <Link to="/myorders">
                    <li className="p-[10px] hover:bg-[orange] "> My Orders 
                    </li>
                  </Link>
                  <Link to="/">
                    <li
                      className="p-[10px] hover:bg-[orange] "
                      onClick={logOut}
                    >
                      Logout
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard">
                    <li className="p-[10px] hover:bg-[orange] "> Dashboard </li>
                  </Link>
                  <Link to="/">
                    <li
                      onClick={logOut}
                      className="p-[10px] hover:bg-[orange] "
                    >
                      Logout
                    </li>
                  </Link>
                </>
              )
               ) : (
              <>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                >
                  <button
                    className="p-[10px] hover:bg-[orange] "
                    // className="font-medium text-white bg-orange-500 py-2 px-4 rounded-full hover:bg-orange-600"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Sign Up
                  </button>
                  {showDropdown && (
                    <div
                      className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <div className="bg-white rounded-md shadow-xs">
                        <div className="py-1">
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Admin
                          </Link>
                          <Link
                            to="/userRegister"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Customer
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown2(true)}
                >
                  <button
                    className="p-[10px] hover:bg-[orange] "
                    // className="font-medium text-white bg-orange-500 py-2 px-4 rounded-full hover:bg-orange-600"
                    onClick={() => setShowDropdown2(!showDropdown2)}
                  >
                    Login
                  </button>
                  {showDropdown2 && (
                    <div
                      className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
                      onMouseEnter={() => setShowDropdown2(true)}
                      onMouseLeave={() => setShowDropdown2(false)}
                    >
                      <div className="bg-white rounded-md shadow-xs">
                        <div className="py-1">
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Admin
                          </Link>
                          <Link
                            to="/userLogin"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Customer
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
             )
            }
          </ul>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* navigation links */}
            <ul>  
                    <li className="p-[10px] hover:bg-[orange]"> 
                    <Link to="/">Home</Link></li>
                    <li className="p-[10px] hover:bg-[orange]">
                        <Link to="/products">Our Products</Link></li>
                    {currentUser ? (
              currentUser === "user" ? (
                <>
                  <Link to="/cart">
                    <li className="p-[10px] hover:bg-[orange] ">
                      <Link to="/cart"> Cart({cartLength}) </Link>
                    </li>
                  </Link>
                  <Link to="/myorders">
                    <li className="p-[10px] hover:bg-[orange] "> My Orders 
                    </li>
                  </Link>
                  <Link to="/">
                    <li
                      className="p-[10px] hover:bg-[orange] "
                      onClick={logOut}
                    >
                      Logout
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard">
                    <li className="p-[10px] hover:bg-[orange] "> Dashboard </li>
                  </Link>
                  <Link to="/">
                    <li
                      onClick={logOut}
                      className="p-[10px] hover:bg-[orange] "
                    >
                      Logout
                    </li>
                  </Link>
                </>
              )
               ) : (
              <>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                 >
                  <button
                    className="p-[10px] hover:bg-[orange] w-full text-left"
                    // className="font-medium text-white bg-orange-500 py-2 px-4 rounded-full hover:bg-orange-600"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Sign Up
                  </button>
                  {showDropdown && (
                    <div
                      className="absolute block z-10 left-0 w-full mt-2 origin-top-right rounded-md shadow-lg"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <div className="bg-white rounded-md shadow-xs">
                        <div className="py-1">
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Admin
                          </Link>
                          <Link
                            to="/userRegister"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Customer
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown2(true)}
                >
                  <button
                    className="p-[10px] hover:bg-[orange] w-full text-left "
                    // className="font-medium text-white bg-orange-500 py-2 px-4 rounded-full hover:bg-orange-600"
                    onClick={() => setShowDropdown2(!showDropdown2)}
                  >
                    Login
                  </button>
                  {showDropdown2 && (
                    <div
                      className="absolute block z-10 left-0 w-full mt-2 origin-top-right rounded-md shadow-lg"
                      onMouseEnter={() => setShowDropdown2(true)}
                      onMouseLeave={() => setShowDropdown2(false)}
                    >
                      <div className="bg-white rounded-md shadow-xs">
                        <div className="py-1">
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Admin
                          </Link>
                          <Link
                            to="/userLogin"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-500 hover:text-white"
                          >
                            Customer
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
             )
            }
                </ul>
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close main menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
}

export default Nav;