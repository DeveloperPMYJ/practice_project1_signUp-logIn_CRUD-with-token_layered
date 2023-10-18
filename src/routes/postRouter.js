// router (http 요청) 처리
// postController를 부른다.
const express = require("express");
const { postController } = require("../controllers");

const postRouter = express.Router();

postRouter.get("/getpost", postController.getPost);
postRouter.post("/createpost", postController.createPost);
postRouter.delete("/deletepost/:id", postController.deletePost);
postRouter.put("/updatepost/:id", postController.updatePost);

module.exports = { postRouter };
