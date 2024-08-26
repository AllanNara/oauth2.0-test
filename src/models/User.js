const sequelize = require("../database.js")
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User