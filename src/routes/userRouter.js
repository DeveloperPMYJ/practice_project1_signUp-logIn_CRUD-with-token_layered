// userController를 부른다. 
const express = require('express');
const userController = require('../controllers');
//const userController = require('../controllers/userController.js')

const router = express.Router();

router.get('/getusers', userController.getUsers);
router.post('/signup', userController.signUp);
// router.post('/signup', () => {console.log("Router Connected")}
router.post('/login', userController.logIn);

module.exports = { router }
//함수명 내보내주기 