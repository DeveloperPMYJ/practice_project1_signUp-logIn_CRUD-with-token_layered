const jwt = require('jsonwebtoken')
const {postDao} = require('../models')

const createPost = async (userId, content) => {

    if(!token){
      const error = new Error ("TOKEN_ERROR 게시물 작성 권한이 없습니다");
      error.statusCode = 400;
      error.code = "TOKEN_ERROR"
    throw error;
      }

    console.log(token);

    if (!id) {
      const error = new Error ("verify_token_ERROR 게시물 작성 권한이 없습니다");
      error.statusCode = 400;
      error.code = "verify_token_ERROR";
    throw error;
    }


    if (content.length === 0 ) {
      const error = new Error("CONTENT_TOO_SHORT 1글자 이상 적어주세요"); 
      error.status = 400;
      error.code="CONTENT_TOO_SHORT"
    throw error;
      } 

    const newPost = await postDao.createPost(userId, threadsId, content, createdAt)
    return newPost
}
  
    
//게시물 조회
const getPost = async (postId) => {

    const readData = await postDao.getPost(postId)
    
    return readData
  }
    

// 게시물 삭제
const deletePost = async (id, threadsId) => {

    if(!token){
      const error = new Error ("TOKEN_ERROR 게시물 삭제 권한이 없습니다");
      error.statusCode = 400;
      error.code = "TOKEN_ERROR"
    throw error;
    }
    console.log(token);


  const deletingPostData  = await postDao.deletePost(id, threadsId)
  return deletingPostData  
}


const updatePost = async (id, threadsId, newContent) => {
  
  if(!token){
    const error = new Error ("TOKEN_ERROR 게시물 수정 권한이 없습니다");
    error.statusCode = 400;
    error.code = "TOKEN_ERROR"
  throw error;
  }
  
  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);

  if (!id ) {
    const error = new Error ("verify_token_ERROR 게시물 작성 권한이 없습니다");
    error.statusCode = 400;
    error.code = "verify_token_ERROR";
  throw error;
  }

  const updatingPostData = await postDao.query(id, threadsId, newContent)
  
  if (updatingPostData.newContent.length === 0) {
    const error = new Error("수정 권한이 없습니다");
    error.statusCode = 400;
    error.code = "unauthorized user"
  throw error;
  }
};

  module.exports = {
    "createPost" : createPost, 
    "getPost": getPost,
    "deletePost": deletePost,
    "updatePost": updatePost
    }