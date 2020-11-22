const { Commentar, User, UserPost } = require('../models');
const jwt = require('jsonwebtoken');
async function commentAuthorize(req, res, next) {
  try {
    const comment = await Commentar.findOne({ where: { id: req.params.commentId }});
    if(comment) {
      if(comment.UserId === req.userPayload.id) {
        next()
      } else {
        next({ name: 'UnauthorizeAccess', message: `You don't allow to do this access` });
      }
    } else {
      next({ name: 'NotFound', message: `404 Not Found` });
    }
  } catch (e) {

  }
}

module.exports = commentAuthorize;
