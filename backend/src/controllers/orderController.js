

import * as orderService from "../services/orderServices.js"

export function createOrders(req,res,next) {
    console.log("req ordes",req.body)
    orderService
    .createOrders(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export function getAllOrders(req, res, next) {
    console.log("getall ordes",req.params.id)
    orderService
      .getAllOrders(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }

  export function deleteOrder(req, res, next) {
    orderService
      .deleteProduct(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  }