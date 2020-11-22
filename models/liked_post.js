'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liked_Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Liked_Post.belongsTo(models.User)
      Liked_Post.belongsTo(models.UserPost)
      // define association here
    }
  };
  Liked_Post.init({
    UserId: DataTypes.INTEGER,
    UserPostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liked_Post',
  });
  return Liked_Post;
};
