import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import {useSelector,useDispatch} from "react-redux"
import {addToCart} from "../redux/cartSlice.js"
import * as productServices from "../services/index.js";
import { Link, useNavigate } from 'react-router-dom';

//Detail of product is displayed with the help of id from the useParams hook
const DetailProduct = () => {
    const {id} = useParams();
    console.log("this is iddetail product",id)
    const [product,setProduct] =useState("");
    const dispatch = useDispatch();
    const userStorage = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then(res => res.json())
        .then(res => {
          console.log("this",res)
          setProduct(res.data)})
        .catch(err => console.error(err))
    },[])

  return (
    <>
      {product && (
        <div className="rounded-md shadow-2xl mt-[20px]">
          <div className="product flex flex-row ">
            <img
              src={product.images}
              alt="img"
              className="h-[330px] w-[330px] inline-block"
            />
            <div className="description ml-[20px]">
              <h1 className="text-[40px]">{product.name}</h1>
              <p>{product.description}</p>
              <p className="text-orange-500">Rs.{product.price}</p>
              <div className="buttons">
                {userStorage ? <Link to = "/cart">
                <button onClick={() => dispatch(addToCart(product))}  
                className="shadow-md p-[5px] mb-[20px] mt-[10px] text-white rounded-md bg-orange-600 hover:mt-[-5px]">
                  Buy Now
                </button>
                </Link>:
                <Link to = "/login">
                <button 
                className="shadow-md p-[5px] mb-[20px] mt-[10px] text-white rounded-md bg-orange-600 hover:mt-[-5px]">
                  Buy Now
                </button>
                </Link>}
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="shadow-md p-[5px] mb-[20px] ml-[10px] mt-[10px] text-white rounded-md bg-orange-600"
                  data-testid="add"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailProduct


