const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantRates",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        field: "restaurant_id",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "restaurant_rates",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
