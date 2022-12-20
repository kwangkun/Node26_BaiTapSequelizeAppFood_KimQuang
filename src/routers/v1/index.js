// Routers V1
const express = require("express");
const authController = require("../../controllers/auth.controller");
const userRouter = require("./users.router");
const restaurantRouter = require("./restaurant.router");
const orderRouter = require("./order.router");
const foodRouter = require("./food.router");
const orderDetailRouter = require("./orderDetail.router");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho users
v1.use("/", userRouter)

// Định nghĩa các routers cho restaurants
v1.use("/", restaurantRouter)

// Định nghĩa các routers cho orders
v1.use("/", orderRouter)

// Định nghĩa các routers cho foods
v1.use("/", foodRouter)

// Định nghĩa các rounters cho orderDetail
v1.use("/", orderDetailRouter)

// Định nghĩa các routers cho auth
v1.post("/login", authController.login());

module.exports = v1;
