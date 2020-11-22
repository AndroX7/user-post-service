const { User } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class UserController {
  static async postLogin(req, res, next) {
    try {
      if(!req.body.password || !req.body.email) {
        next({ name: 'LoginError', message: 'Incorrect Username/Password' });
      } else {
        const userLogin = await User.findOne({ where: { email: req.body.email }})
        if(userLogin.user_status === true) {
          if(bcrypt.compareSync(req.body.password,userLogin.password)) {
            let access_token = jwt.sign({ id: userLogin.id, username: userLogin.username, email: userLogin.email, user_status: userLogin.status }, process.env.SECRET_KEY);
            res.status(200).json({
              access_token: access_token,
              username: userLogin.username,
              email: userLogin.email
            })
          } else {
            next({ name: 'LoginError', message: 'Incorrect Username/Password' });
          }
        } else {
          next({ name: 'LoginError', message: 'Please Activated Your Account' });
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async patchUserActivation(req, res, next) {
    try {
      const payload = jwt.verify(req.params.userToken, process.env.SECRET_KEY);
      const userData = await User.findOne({
        where:
        {
          id: payload.id
        },
        attributes:
        {
        exclude: ['createdAt','updatedAt', 'password', 'user_status']
      } });
      if(userData) {
        if(!userData.user_status) {
          const activated = await User.update({
            user_status: true
          }, {
            where: {
              id: userData.id
            }
          })
          res.status(200).json({
            userData,
            message: `${userData.username} has been Verified!`
          })
        } else {
          res.status(200).json({
            message: `${userData.username} Already Verified!`
          })
        }
      } else {
        res.status(500).json({
          message: `Token Expired`
        })
      }
    } catch (err) {
      next(err)
    }
  }
  static async postRegister(req, res, next) {
    try {
      if(!req.body.username || !req.body.email || !req.body.password) {
        next({ name: 'RegisterError', message: "Please Fill the Blank Field"})
      } else {
        const registerUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          user_status: false
        })
        if(registerUser) {
          let access_token = jwt.sign({ id: registerUser.id, username: registerUser.username, email: registerUser.email}, process.env.SECRET_KEY);
          res.status(201).json({
            sent_to: registerUser.email,
            message: `User @${registerUser.email} successfully registered!, Please Activated your account at : https://wlb-pre-test.herokuapp.com/${access_token}/-b/active`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = UserController
