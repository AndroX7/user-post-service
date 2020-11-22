const { User, UserPost, Liked_Post, Commentar } = require('../models/index.js');
const axios = require('axios')
class UserPostController {
  static postContent(req, res, next) {
    UserPost.create({
      judul_konten: req.body.judul_konten,
      konten: req.body.konten,
      konten_source: req.body.konten,
      like_count: 0,
      UserId: req.userPayload.id
    })
    .then(data => {
      res.status(201).json({
        message: `"${data.judul_konten}" Has Successfully Published`
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static async editContent(req, res, next) {
    UserPost.update({
      judul_konten: req.body.judul_konten,
      konten: req.body.konten,
      konten_source: req.body.konten
    },{
      where: {
        id: req.params.contentId
      }
    })
    .then(data => {
      res.status(200).json({
        message: "Content Has Been Updated"
      })
    })
    .catch(err => {
      next(err)
    })
  }
  static deleteContent(req, res, next) {
    UserPost.destroy({
      where: {
        id: req.params.contentId
      }
    })
    .then(data => {
      res.status(200).json({
        message: "Content Has Been Deleted"
      })
    })
    .catch(err => {
      next(err)
    })
  }
  static async getContentById(req, res, next) {
    UserPost.findOne({
      where: {
        id: req.params.contentId
      },
      attributes: {
        exclude: ['createdAt','updatedAt']
      },
      include: Commentar
    })
    .then(content => {
      if(content) {
        res.status(200).json(content)
      } else {
        next({ name: 'NotFound', message: `404 Not Found` });
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static async patchLike(req, res, next) {
    const likedCheck = await Liked_Post.findOne({
      where: {
        UserPostId: req.params.contentId,
        UserId: req.userPayload.id
      }
    })
    const currentLike = await UserPost.findOne({ where: { id: req.params.contentId }})
    try {
      if(!likedCheck) {
        await Liked_Post.create({
          UserId: req.userPayload.id,
          UserPostId: req.params.contentId
        })
        const like = await UserPost.update({
          like_count: Number(currentLike.like_count)+1
        },{
          where: {
            id: req.params.contentId
          }
        })
        res.status(200).json({
          message: "Liked"
        })
      } else if (likedCheck) {
        await Liked_Post.destroy({
          where: {
            UserId: req.userPayload.id,
            UserPostId: req.params.contentId
          }
        })
        const unlike = await UserPost.update({
          like_count: Number(currentLike.like_count)-1
        },{
          where: {
            id: req.params.contentId
          }
        })
        res.status(200).json({
          message: "Unliked"
        })
      }
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
  static async getAllContent(req, res, next) {
    try {
      if(req.body.orderBy && req.body.Sort) {
        const getContent = await UserPost.findAll({
          attributes: {
            exclude: ['createdAt','updatedAt', 'UserId']
          },
          order: [
            [`${req.body.orderBy}`,`${req.body.Sort}`]
          ],
          include: Commentar
        })
        res.status(200).json(getContent)
      } else if(req.body.orderBy && !req.body.Sort || !req.body.orderBy && req.body.Sort) {
        res.status(400).json({
          message: `Please Fill the params`
        })
      } else {
        const getContent = await UserPost.findAll({
          attributes: {
            exclude: ['createdAt','updatedAt', 'UserId']
          },
          include: Commentar
        })
        res.status(200).json(getContent)
      }
    } catch (e) {

    }
  }
}

module.exports = UserPostController
