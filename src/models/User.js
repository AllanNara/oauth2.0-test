const sequelize = require("./database.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
	"users",
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
		age: {
			type: DataTypes.INTEGER,
			defaultValue: null,
		},
		role: {
			type: DataTypes.ENUM("admin", "user"),
			allowNull: false,
			defaultValue: "user",
		},
	},
	{
		timestamps: false,
	}
);

module.exports = User;
