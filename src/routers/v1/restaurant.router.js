const express = require("express");
const restaurantRouter = express.Router();
const restaurantController = require("../../controllers/restaurant.controller");


// Định nghĩa các routers cho restaurants
restaurantRouter.get("/restaurantLikesByUserId/:userId", restaurantController.getRestaurantLikesbyUserId());
restaurantRouter.get("/getRestaurantLikesByRestaurantId/:restaurantId", restaurantController.getRestaurantLikesByRestaurantId());
restaurantRouter.get("/getRestaurantRatesByRestaurantId/:restaurantId", restaurantController.getRestaurantRatesbyRestaurantId())
restaurantRouter.get("/restaurantRatesByUserId/:userId", restaurantController.getRestaurantRatesByUserId());

//like và unlike nhà hàng
restaurantRouter.post(
  "/restaurants/:restaurantId/like",
  restaurantController.likeRestaurant()
);
restaurantRouter.delete("/restaurants/:restaurantId/unLike", restaurantController.unLikeRestaurant())

// Đánh giá nhà hàng
restaurantRouter.post("/restaurants/:restaurantId/rate", restaurantController.rateRestaurant())

module.exports = restaurantRouter