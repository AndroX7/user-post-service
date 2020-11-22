'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserPost)
      User.hasMany(models.Liked_Post)
      User.hasMany(models.Commentar)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username Cannot be Leave Empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Cannot be Leave Empty!"
        },
        is: {
            args: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            msg: "Invalid Email format. Please re-check your email!"
          }
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Password cannot be empty." },
        len: {
          args: [6,],
          msg: 'Password must be 6 character less'
        }
      }
    },
    user_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: " cannot be empty." }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (data) => {
    const salt = bcrypt.genSaltSync(10);
    if (Array.isArray(data)) {
      data.forEach((element) => {
        element.password = bcrypt.hashSync(element.password, salt);
      })
    } else {
      data.password = bcrypt.hashSync(data.password, salt);
    }
  })
  return User;
};
