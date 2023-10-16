const express = require("express");
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
