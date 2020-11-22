const router = require('express').Router();
const CommentarController = require('../controllers/comment-controller.js');
const commentAuthorize = require('../middlewares/comment-auth.js');
router.get('/:commentId', CommentarController.getCommentById);
router.post('/:contentId', CommentarController.postComment);
router.patch('/:commentId', commentAuthorize, CommentarController.editComment);
router.delete('/:commentId', commentAuthorize, CommentarController.deleteComment);

module.exports = router;
