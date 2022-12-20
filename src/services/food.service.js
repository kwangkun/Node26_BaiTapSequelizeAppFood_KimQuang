const { AppError } = require("../helpers/error");
const { Foods, Restaurant } = require("../models");

const getFoods = async () => {
  try {
    const foods = await Foods.findAll();
    return foods;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFoodByID = async (id) => {
  try {

    const food = await Foods.findOne({
        where: {
            id: id,
        }
    })

    if (!food) {
      throw new AppError(404, "Food not found");
    }

    return food;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createFood = async (data) => {
  try {
    const res = await Restaurant.findByPk(data.restaurantId);
    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }

    const createdFood = Foods.create(data);
    return createdFood;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFood = async (id, data) => {
  try {
    const food = await Foods.findByPk(id);

    if (!food) {
      throw new AppError(400, "Food not found");
    }

    food.set(data);
    await food.save();

    return food;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFood = async (id) => {
  try {
    const food = await Foods.findByPk(id);

    if (!food) {
      throw new AppError(400, "Food not found");
    }

    await Foods.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getFoods,
  getFoodByID,
  createFood,
  updateFood,
  deleteFood,
};