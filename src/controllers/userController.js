// req 를 다루는 부분만 있음 (front에 res, req만) (인자는 req,res 모두 담기: client 과 접점 역할이기에)
//비즈니스 로직으로 들어가야할 데이터들이 올바른 형태를 띄고 있는지 선검증 작업
//  Key Error 를 사전에 에러처리로 검열
const express = require('express');
const userService = require('../services');

 
const getUsers = async (req, res) => {
  try {
    return res.status(200).json({
    users: userData});
  } catch (error) {
    return res.status(500).json({message: error.message});
    }
  }

const signUp = async (req, res) => {
  try {
    console.log('userController connencted')
    const { email, password, nickname } = req.body;
  
    // 프론트에 req 받는 부분 : key error
    if ( !email || !password || !nickname ) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
    }

    // service 파일의 비즈니스 로직으로 'email, password, nickname' 보냄
    await userServcie.signUp(email, password, nickname)

    // 프론트에 res 보내는 부분 
    return res.status(201).json({
      message: "userCreated 회원가입 완료",
    });
    } 
    catch (error) {
      return res.status(error.statusCode).json({
          message: 'failed 회원가입에 실패하였습니다',
    });
  }}


const logIn = async (req, res) => {
    try {
    const { email, password } = req.body; 
    // Key error
    if (email === undefined || password === undefined) {
        const error = new Error("KEY_ERROR");
        error.statusCode = 400;
        throw error;
    }
    return res.status(200).json({
        message: "LOGIN_SUCCESS 로그인 성공하였습니다",
        accessToken: token,
    });
    } 
    catch (error) {
      return res.status(400).json(error);
    }
    };

module.exports = {
    getUsers,
    signUp, 
    logIn}