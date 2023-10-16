const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const dotenv = require("dotenv")
dotenv.config()

const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get("/", async (req, res) => {
  try {
  return res.status(200).json({ message: "Welcome to Team6's server!" });
  } catch (err) {
  console.log(err);
  }
});

app.get("/users", userService.getUsers)
app.post("/users/signup", userService.signUp)
app.post("/logIn", userService.logIn)
app.post ("/createpost", postService.createPost)
app.get("/getpost", postService.getPost)
app.delete("/deletepost", postService.deletePost)
app.put("/updatepost", postService.updatePost)

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
  
