const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");
const restaurantService = require("../services/restaurant.service");

const getRestaurantLikesbyUserId = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params
      const restaurants = await restaurantService.getRestaurantLikesbyUserId(userId);
      if (restaurants) {
        res.status(200).json(response(restaurants));
      }
      throw new AppError(404, "This user hasn't liked any restaurants yet")
    } catch (error) {
      next(error);
    }
  };
};

const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await restaurantService.likeRestaurant(userId, restaurantId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

const unLikeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      const deletedLike = await restaurantService.unLikeRestaurant(userId, restaurantId);
      if (deletedLike) {
        res.status(200).json(response("DELETED"));
      }
      throw new AppError(404, "NOT FOUND")
    } catch (error) {
      next(error);
    }
  }
}

const getRestaurantLikesByRestaurantId = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const restaurantLikes = await restaurantService.getRestaurantLikebyRestaurantId(restaurantId);
      if (restaurantLikes) {
        res.status(200).json(response(restaurantLikes));
      }
      throw new AppError(404, "No one has liked this restaurant yet")
    } catch (error) {
      next(error);
    }
  };
}

const getRestaurantRatesbyRestaurantId = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params
      const restaurantRates = await restaurantService.getRestaurantRatesbyRestaurantId(restaurantId);
      if (restaurantRates) {
        res.status(200).json(response(restaurantRates));
      }
      throw new AppError(404, "No one has rated this restaurant yet")
    } catch (error) {
      next(error);
    }
  };
}

const getRestaurantRatesByUserId = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const restaurantRates = await restaurantService.getRestaurantRatesByUserId(userId);
      if (restaurantRates) {
        res.status(200).json(response(restaurantRates));
      }
      throw new AppError(404, "This user hasn't rated any restaurants yet")
    } catch (error) {
      next(error);
    }
  };
}

const rateRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId, amount } = req.body;
      const ratedRestaurant = await restaurantService.rateRestaurant(userId, restaurantId, amount);
      if (ratedRestaurant) {
        res.status(200).json(response("OK"));
      }
      res.status(500).json("You have already rated");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  getRestaurantLikesbyUserId,
  likeRestaurant,
  unLikeRestaurant,
  rateRestaurant,
  getRestaurantLikesByRestaurantId,
  getRestaurantRatesbyRestaurantId,
  getRestaurantRatesByUserId,
};
