const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const dotenv = require("dotenv")
dotenv.config()

const routes = require("./src/routes");

const app = express();




  // 서버 구동 
  const server = http.createServer(app)
  const portNumber = process.env.PORT || 8000;
  
  const start = async () => {
    try {
      server.listen(portNumber);
      console.log(`Server is listening on ${portNumber}`);
    } catch (err) {
      console.error(err);
    }
  };
  
  start();
  
