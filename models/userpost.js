'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPost.belongsTo(models.User)
      UserPost.hasMany(models.Liked_Post)
      UserPost.hasMany(models.Commentar)
    }
  };
  UserPost.init({
    judul_konten: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please Fill The Title"
        }
      }
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Cannot Post Empty Content"
        }
      }
    },
    konten_source: DataTypes.STRING,
    like_count: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPost',
  });
  return UserPost;
};
