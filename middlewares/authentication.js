const jwt = require('jsonwebtoken');
const { User, UserPost } = require('../models/index.js');

module.exports = async function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      res.status(401).json({
        message: "Unauthorized Access!"
      })
    } else {
      const payload = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)
      const userData = await User.findOne({ where: { id: payload.id } });
      if(userData !== null) {
        if(userData.user_status !== false) {
          req.paramsContent = req.params.contentId
          req.userPayload = payload
          next()
        } else {
          res.status(401).json({
            message: "Please Verify Your Account!"
          })
        }
      } else {
        res.status(401).json({
          message: "Unauthorized Access!"
        })
      }
    }
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized Access!"
    })
  }
}
