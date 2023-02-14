import React from 'react'
import { Footer } from '../Component/Footer'
import { Navbar } from '../Component/Navbar'
import { useState } from 'react'
import Products from './Products'
import Users from './Users'
import Orders from './Orders'

const Dashboard = () => {
  const [show,setShow] =useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };
return (
  <>
    <div className="flex flex-row">
      <div className="w-1/5 bg-gray-800 h-screen">
        <ul className="text-white font-medium p-6">
          <li className="mb-3">
            <button
              onClick={()=>handleComponentClick(<Products/>)}
              className="w-full py-2 text-left text-white hover:bg-gray-700 focus:outline-none"
            >
              Products
            </button>
          </li>
          <li className="mb-3">
            <button
              onClick={()=>handleComponentClick(<Users/>)}
              className="w-full py-2 text-left text-white hover:bg-gray-700 focus:outline-none"
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
      </div>
      <div className="ml-10 w-4/5 h-screen">
        {selectedComponent ? selectedComponent : <Products/>}
        {/* {show ? <Products/> :<Products/>} */}
      </div>
    </div>
  </>
);


}

export default Dashboard