const { AppError } = require("../helpers/error");
const { OrderDetail, Foods, Orders } = require("../models");

const getOrderDetails = async () => {
  try {
    const orderDetails = await OrderDetail.findAll();
    return orderDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrderDetails = async (data) => {
  try {
    const order = await Orders.findByPk(data.orderId);
    if (!order) {
      throw new AppError(400, "order not found");
    }
    const food = await Foods.findByPk(data.foodId);
    if(!food) {
        throw new AppError(400, "food not found");
    }
    const createdOrderDetail = await OrderDetail.create(data);
    return createdOrderDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getOrderDetails,
  createOrderDetails,
};