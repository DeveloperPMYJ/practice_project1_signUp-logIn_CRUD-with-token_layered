// router (http 요청) 처리 
// postController를 부른다. 
const express = require('express');
const postController = require('../controllers');

const router = express.Router();

router.get('/readpost', postController.getPost);
router.post('/createpost', postController.createPost);
router.delete('/deletepost/:id', postController.deletePost);
router.put('/updatepost/:id', postController.updatePost);

module.exports = { router }