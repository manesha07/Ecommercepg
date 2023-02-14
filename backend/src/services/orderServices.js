import Boom from "@hapi/boom";

import Order from "../models/order.js"

export async function getAllOrdersByUser(id) {
    const returnedData = await new Order().getByUserId(id);
    console.log("db",returnedData)
    return {
      data: returnedData,
      message: "Succesfully fetched all order data",
    };
  }

  export async function getAllOrders() {
    const returnedData = await new Order().getAll();
    console.log("db",returnedData)
    return {
      data: returnedData,
      message: "Succesfully fetched all order data",
    };
  }

  export async function createOrders(data) {

    const insertedData = await new Order().save1(data);

    return {
        data: insertedData,
        message: 'Added User successfully',
    }
}

export async function deleteProduct(id) {
  const returnedData = await new Order().removeByUserId(id);
 
  return {
    data: returnedData,
    message: "Succesfully deleted Product",
  };
}
