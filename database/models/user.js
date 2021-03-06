'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'UserId'})
      User.hasMany(models.Banner, {foreignKey: 'UserId'})
      User.hasMany(models.ShoppingCart, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        args: "email",
        msg: "email must be unique"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "email is invalid"
        },
        notEmpty: {
          args: true,
          msg: "email is required"
        },
        notNull: {
          args: true,
          msg: "email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required"
        },
        notNull: {
          args: true,
          msg: "password is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};