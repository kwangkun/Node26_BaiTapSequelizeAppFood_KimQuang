const { response } = require("../helpers/response");
const orderDetailService = require("../services/orderDetail.service");

// GET localhost:4000/orders
const getOrderDetails = () => {
    return async (req, res, next) => {
        try {
            const orderDetails = await orderDetailService.getOrderDetails();
            res.status(200).json(response(orderDetails));
        } catch (error) {
            next(error);
        }
    };
};

// POST localhost:4000/orders
const createdOrderDetails = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const createdOrderDetail = await orderDetailService.createOrderDetails(data);
            res.status(200).json(response(createdOrderDetail));
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    getOrderDetails,
    createdOrderDetails,
};