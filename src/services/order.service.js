const { AppError } = require("../helpers/error");
const { Orders, User } = require("../models");

const getOrders = async () => {
  try {
    const orders = await Orders.findAll({
      include: "orderDetail",
    });
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrder = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    const createdOrder = await Orders.create(data);
    return createdOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getOrders,
  createOrder,
};