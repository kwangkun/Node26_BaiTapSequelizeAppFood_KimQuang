const { AppError } = require("../helpers/error");
const { User } = require("../models");

// Service nhận vào data từ controller
// Nhiệm vụ: xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống DB, nhận data từ DB và return về cho controller

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  };
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // Email đã tồn tại trong db
    if (user) {
      throw new Error("Email đã tồn tại!")
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete: 
// - User.findOne({where: { id: 1 } }) - ko tìm thấy trả về lỗi
// - User.destroy({ where: { id: 1 } }) (DELETE)
// Update: 
// - User.findOne({where: { id: 1 } }) - ko tìm thấy trả về lỗi
// - User.update(data, { where: { id: 1 } }) (UPDATE)
// - User.findOne({where: {id: 1} })

const updateUser = async (id, data) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new AppError(400, "User not found");
    }

    user.set(data);
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError(400, "User not found");
    }

    await User.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};