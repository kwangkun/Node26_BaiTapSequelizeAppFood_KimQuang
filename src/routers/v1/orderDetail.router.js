const express = require("express");
const orderDetailRouter = express.Router();
const orderDetailController = require("../../controllers/orderDetail.controller");

orderDetailRouter.get("/orderDetails", orderDetailController.getOrderDetails())
orderDetailRouter.post("/orderDetails", orderDetailController.createdOrderDetails())

module.exports = orderDetailRouter