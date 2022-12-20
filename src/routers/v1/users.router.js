const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/users.controller");

userRouter.get("/users", userController.getUsers());
userRouter.get("/users/:id", userController.getUserByID());
userRouter.post("/users", userController.createUser());
userRouter.put("/users/:id", userController.updateUser());
userRouter.delete("/users/:id", userController.deleteUser());

module.exports = userRouter