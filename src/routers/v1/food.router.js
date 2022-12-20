const express = require("express");
const foodRouter = express.Router();
const foodController = require("../../controllers/food.controller");

foodRouter.get("/foods", foodController.getFoods());
foodRouter.get("/foods/:id", foodController.getFoodByID());
foodRouter.post("/foods", foodController.createFood());
foodRouter.put("/foods/:id", foodController.updateFood());
foodRouter.delete("/foods/:id", foodController.deleteFood());

module.exports = foodRouter