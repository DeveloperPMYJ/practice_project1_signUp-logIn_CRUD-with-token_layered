// userController를 부른다.
const express = require("express");
const { userController } = require("../controllers");
//const userController = require('../controllers/userController.js')

const userRouter = express.Router();

userRouter.get("/getusers", userController.getUsers);
userRouter.post("/signup", userController.signUp);
// router.post('/signup', () => {console.log("Router Connected")}
userRouter.post("/login", userController.logIn);

module.exports = { userRouter };
//함수명 내보내주기
