const express =require("express");

const {userRouter} = require("./userRouter"); 
const {threadRouter} = require("./threadRouter");

routers.use ("/users", userRouter)
routers.user("/threads", threadRouter)

module.exports = { routers}