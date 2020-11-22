const { UserPost } = require('../models');
const jwt = require('jsonwebtoken');
async function authorization(req, res, next) {
  try {
    const post = await UserPost.findOne({ where: { id: req.params.contentId}})
    if (post) {
      if(post.UserId === req.userPayload.id) {
        next()
      } else {
        next({ name: 'UnauthorizeAccess', message: `You don't allow to do this access` });
      }
    } else {
      next({ name: 'NotFound', message: `404 Not Found` });
    }
  } catch (err) {
    next(err)
  }
}
module.exports = authorization
