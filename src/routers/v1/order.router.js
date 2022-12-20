const express = require("express");
const orderRouter = express.Router();
const orderController = require("../../controllers/order.controller");

orderRouter.get("/orders", orderController.getOrders());
orderRouter.post("/orders", orderController.createdOrder());

module.exports = orderRouter