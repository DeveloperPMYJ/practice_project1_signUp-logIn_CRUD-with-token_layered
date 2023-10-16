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
//console.log(req.body); 

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

    const { id } = jwt.verify(token, process.env.TYPEORM_JWT);
    console.log(id);

    const { threadsId } = req.body 
    // const { id } = req.body ; userId는 token에 'id'로 담겨 있음 

    
  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService.deletePost(id, threadsId)

  return res.status(200).json({message:"DELETE POST 게시물 삭제"}) 
  } 
  catch(error){
    return res.status(400).json({message:"FAILED"});
  };
};

    
const updatePost = async (req,res) => {
  try {
    const token = req.headers.authorization; 

    console.log(token);

    const { id } = jwt.verify(token, process.env.TYPEORM_JWT); //const { userId } = req.body 를 token에 담긴 id (같은 userId) ; token에 id를 담는다.패스워드는 위험해서 안 담고. 누군지만 알게. 
    const { threadsId } = req.body
    const { newContent } = req.body 

    console.log(id);

  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService.updatePost(id, threadsId, newContent)

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