const { AppError } = require("../helpers/error");
const { Restaurant, User, RestaurantRates, RestaurantLikes } = require("../models");

const getRestaurantLikesbyUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found")
    }
    const restaurantLikes = await user.getRestaurantLikes();
    if (restaurantLikes.length) {
      return restaurantLikes
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRestaurantLikebyRestaurantId = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found")
    }
    const restaurantLikes = await restaurant.getUserLikes();
    if (restaurantLikes.length) {
      return restaurantLikes
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRestaurantRatesbyRestaurantId = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found")
    }
    const restaurantRates = await restaurant.getUserRates();
    if(restaurantRates.length) {
      return restaurantRates;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getRestaurantRatesByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found")
    }
    const restaurantRates = await user.getRestaurantRates();
    if (restaurantRates.length) {
      return restaurantRates
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }

    const hasLiked = await restaurant.hasUserLike(user.id);

    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const unLikeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }

    const hasLiked = await restaurant.hasUserLike(user.id);

    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const rateRestaurant = async (userId, restaurantId, amount) => {

  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }

    if (!(amount >= 1 && amount <= 5)) {
      throw new AppError(400, "1 <= amount <= 5");
    }

    if (!(Number.isInteger(amount))) {
      throw new AppError(400, "amount must be a numeric value");
    }

    const hasRated = await restaurant.hasUserRate(user.id)

    if (!hasRated) {
      const ratedRestaurant = await RestaurantRates.create({
        userId: user.id,
        restaurantId: restaurantId,
        amount: amount
      })
      return ratedRestaurant;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  getRestaurantLikesbyUserId,
  likeRestaurant,
  unLikeRestaurant,
  rateRestaurant,
  getRestaurantLikebyRestaurantId,
  getRestaurantRatesbyRestaurantId,
  getRestaurantRatesByUserId,
};
