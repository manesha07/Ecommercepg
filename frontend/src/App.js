import "./App.css";
import { Home } from "./Component/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import DetailProduct from "./Component/DetailProduct";
import DetailUser from "./Component/DetailUser";
import Dashboard from "./Admin/Dashboard";
import AddProduct from "./Admin/AddProduct";
import EditProduct from "./Admin/EditProduct";
import EditUser from "./Admin/EditUsers";
import Cart from "./Component/Cart";
import UserLogin from "./Component/userLogin";
import UserRegister from "./Component/userRegister";
import Products from "./Component/Products";
import { Footer } from "./Component/Footer";

import CheckoutForm from "./Component/Checkout";

import * as Sentry from "@sentry/react";
import MyOrders from "./Component/MyOrders";
import PrivateRoutes from "./utils/PrivateRoutes";
import PrivateUserRoutes from "./utils/PrivateUserRoutes";

function App() {
  return (
    <div className="container max-w-[600px] md:max-w-[1200px] lg:max-w-[1400px] mx-auto">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AddProduct />} path="/addproduct" exact />
          <Route element={<Dashboard />} path="/dashboard" exact />
          <Route exact path="/products/edit/:id" element={<EditProduct />} />
          <Route exact path="/users/edit/:id" element={<EditUser />} />
        </Route>
        <Route element={<PrivateUserRoutes />}>
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/myorders" element={<MyOrders />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/userLogin" element={<UserLogin />} />
        <Route exact path="/userRegister" element={<UserRegister />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<DetailProduct />} />
        <Route exact path="/usersdetail/:id" element={<DetailUser />} />
        <Route exact path="/checkout" element={<CheckoutForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

// function App() {
//   return <>
//   <p>hii</p>
//   <Navbar/>
//   </>
// }

export default Sentry.withProfiler(App);
