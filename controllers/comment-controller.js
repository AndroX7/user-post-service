const { User, UserPost, Liked_Post, Commentar } = require('../models/index.js');
class CommentarController {
  static async postComment(req, res, next) {
    const currentPost = await UserPost.findOne({ where: { id: req.params.contentId }})
    const ownerPost = await User.findOne({ where: { id: currentPost.UserId }})
    await Commentar.create({
      commentar_content: req.body.commentar_content,
      UserId: req.userPayload.id,
      UserPostId: req.params.contentId,
      commentator: req.userPayload.username
    })
    .then(data => {
      res.status(201).json({
        sent_to: ownerPost.email,
        message: `${req.userPayload.username} add a commentar on your post`
      })
    })
    .catch(err => {
      next(err)
    })
  }
  static async editComment(req, res, next) {
    try {
      const editedComment = await Commentar.update({
        commentar_content: req.body.commentar_content
      }, {
        where: {
          id: req.params.commentId
        }
      })
      res.status(200).json({
        message: `Comment Has Been Edited`
      })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
  static async getCommentById(req, res, next) {
    try {
      const getComment = await Commentar.findOne({ where: { id: req.params.commentId }})
      res.status(200).json(getComment)
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
  static deleteComment(req, res, next) {
    Commentar.destroy({
      where: {
        id: req.params.commentId
      }
    })
    .then(data => {
      res.status(200).json({
        message: `Commentar Has been Deleted`
      })
    })
    .catch(err => {
      console.log(er)
      next(err)
    })
  }
}

module.exports = CommentarController;
