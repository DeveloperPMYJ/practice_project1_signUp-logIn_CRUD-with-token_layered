const express = require('express');
const postService = require('../services');


const createPost = async (req, res) => {
  try {
    console.log('postController connected')

    const token = req.headers.authorization; 
    const {content} = req.body;

  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService.createPost(content)

  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);
  
  console.log(id);

  return res.status(200).json({message: "POST CREATED 게시물 생성 완료"}); 
  } 
  catch(error){
    console.error('JWT verification failed:', err.message);
    console.log(error);
    return res.status(400).json({message:"FAILED"});
  }
};


const getPost = async (req, res) => {
  try { 

  const { postId } = req.body;

  await postService.deletePost(postId)

  return res.status(200).json({message:"POST LIST 게시물 목록 조회"}) 
  } 
  catch(error){
    return res.status(400).json({message:"FAILED"})
  }
};

const deletePost = async (req,res) => {
  try {
    const token = req.headers.authorization; 
    
    const { userId} = req.body
    const { threadsId } = req.body

  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService.deletePost(userId, threadsId)

  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);

  return res.status(200).json({message:"DELETE POST 게시물 삭제"}) 
  } 
  catch(error){
    return res.status(400).json({message:"FAILED"});
  };
};
    
const updatePost = async (req,res) => {
  try {
    const token = req.headers.authorization; 

    const { userId } = req.body
    const { threadsId } = req.body
    const { newContent } = req.body 

  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService.updatePost(userId, threadsId, newContent)

  return res.status(200).json({ message:"POST UPDATED 수정 완료"
  });
  }
  catch(error) {
    return res.status(400).json({message:"Failed"});
  }
};

module.exports = { 
    createPost,
    getPost,
    deletePost,
    updatePost
}