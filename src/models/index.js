// Setup Sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node26-food", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();


// Khởi tạo model
const User = require("./User")(sequelize);
const Foods = require("./Foods")(sequelize);
const Orders = require("./Orders")(sequelize);
const OrderDetail = require("./OrderDetail")(sequelize)
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLikes")(sequelize);
const RestaurantRates = require("./RestaurantRate")(sequelize);


// Định nghĩa relationship giữa các model

// User 1 - n Restaurant
Restaurant.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

// User - Foods

// User 1 - n RestaurantLikes
// Restaurant 1 - n RestaurantLikes
User.belongsToMany(Restaurant, {
  as: "restaurantLikes",
  through: RestaurantLikes,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userLikes",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});

// User 1 - n RestaurantRates
// Restaurant 1 - n RestaurantRates
User.belongsToMany(Restaurant, {
  as: "restaurantRates",
  through: RestaurantRates,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userRates",
  through: RestaurantRates,
  foreignKey: "restaurantId",
});

// User 1 - n Order
Orders.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Orders, { as: "orders", foreignKey: "userId" });

// Order 1 - n OrderDetail
OrderDetail.belongsTo(Orders, { as: "order", foreignKey: "orderId" });
Orders.hasMany(OrderDetail, { as: "orderDetail", foreignKey: "orderId" });

// OrderDetail 1 - 1 Food
Foods.hasOne(OrderDetail, { as: "orderDetail", foreignKey: "foodId" });
OrderDetail.belongsTo(Foods, { as: "foods", foreignKey: "foodId" });

// RestaurantRates 1 - n Food
Foods.belongsTo(Restaurant, { as: "restaurant", foreignKey: "restaurantId" });
Restaurant.hasMany(Foods, { as: "foods", foreignKey: "restaurantId" });

module.exports = {
  sequelize,
  User,
  Restaurant,
  Orders,
  OrderDetail,
  Foods,
  RestaurantRates,
};

