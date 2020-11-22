const router = require('express').Router();
const UserPostController = require('../controllers/user-post-controller.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const CommentRoute = require('./commentar-routes.js');
router.use(authentication);
router.use('/comment', CommentRoute)
router.get('/',UserPostController.getAllContent);
router.get('/:contentId',UserPostController.getContentById);
router.post('/',UserPostController.postContent);
router.patch('/like/:contentId', UserPostController.patchLike);
router.put('/:contentId', authorization, UserPostController.editContent);
router.delete('/:contentId', authorization, UserPostController.deleteContent);
module.exports = router
