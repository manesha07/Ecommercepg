import React from 'react'
import Nav from "../Component/Nav";
import { useState } from 'react'
import Products from './Products'
import Users from './Users'
import Orders from './Orders'

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };
  return (
    <><Nav />
      <div className="md:flex md:flex-row">
        < div className="sm:w-full bg-[#EBEDF2] md:show md:w-1/5 md:h-screen z-50 sm:mt-[20px]" >
          <ul className="text-[#4A4C4D] font-medium p-6">
            <li className="mb-3">
              <button
                onClick={() => handleComponentClick(<Products />)}
                className="w-full p-2 text-left hover:bg-[orange] focus:outline-none"
              >
                Products
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => handleComponentClick(<Users />)}
                className="w-full p-2 text-left hover:bg-[orange] focus:outline-none"
              >
                Users
              </button>
            </li>
            {/* <li className="mb-3">
            <button
              onClick={()=>handleComponentClick(<Orders/>)}
              className="w-full py-2 text-left text-white hover:bg-gray-700 focus:outline-none"
            >
              Orders
            </button>
          </li> */}
          </ul>
        </div >
        <div className="sm:w-full md:ml-10 md:w-4/5 md:h-screen">
          {selectedComponent ? selectedComponent : <Products />}
          {/* {show ? <Products/> :<Products/>} */}
        </div>
      </div >
    </>
  );


}

export default Dashboard