const userController = require('./userController')
const postController = require('./postController')


module.exports = {
    userController, 
    postController
}

// 매번 service 파일에서 ('./controllers/userController.js') 
// 여러 줄을 퉁치기 위한 controllers의 index.js 