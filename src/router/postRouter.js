const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/readpost', postController.getPosts);
router.post('/createpost', postController.createPost);
router.delete('/deletepost/:id', postController.deletePost);
router.put('/updatepost/:id', postController.updatePost);

module.exports = router;