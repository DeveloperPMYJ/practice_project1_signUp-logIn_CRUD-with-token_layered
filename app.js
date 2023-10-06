require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to Team6's server!" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const userData = await myDataSource.query(
      "SELECT id, nickname, email FROM USERS "
    );

    console.log("USER DATA:", userData);

    return res.status(200).json({
      users: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

// 회원가입
app.post("/users", async (req, res) => {
  try {
    console.log(req.body); //통신 때 body 찍어보기 위해 

    const { password, email, nickname } = me;

    // key error
    if (
     !email||
     !password ||
     !nickname 
    ) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    // 이메일 중복 확인
    const existingUser = await myDataSource.query(`
      SELECT id, email FROM users WHERE email='${email}';   
      `);
    console.log("existing user:", existingUser);

    if (existingUser.length > 0) {
      const error = new Error("DUPLICATED_EMAIL_ADDRESS");
      error.statusCode = 400;
      throw error;
    }

    // 이메일 . @ 필수 (특수문자 사용 - 정규화)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    if (!email.match(emailRegex)) {
      const error = new Error("유효하지 않은 이메일 주소 형식입니다");
      error.statusCode = 400;
      throw error;
    }
    console.log(extractedEmails);

    // 비밀번호 길이 제한 
    if (password.length < 10) {
      const error = new Error("INVALID_PASSWORD, longer than 10 characters");
      error.statusCode = 400;
      throw error;
    }

    // DB에 유저 정보 저장 전, 비밀번호 해쉬화 
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    // Database에 회원가입 성공한 유저 정보 저장 
    const userData = await myDataSource.query(`
        INSERT INTO users (                    
        password,
        email, 
        nickname
        )
        VALUES (
        '${hashedPw}', 
        '${email}',
        '${nickname}'
        )
    `);

      console.log("after insert into", userData);

    // 회원가입 성공 or 실패 메세지 프론트에 전달
    return res.status(201).json({
      message: "userCreated 회원가입 완료",
    });
} catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: 'failed 회원가입에 실패하였습니다',
    });
  }
});
// 위에서 던진 try 안에 if 문 true면 return 201, false면 catch error로 


// 로그인 
app.post("/logIn", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // 키 에러 
    if (email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await myDataSource.query(`
    SELECT id, email, password FROM users WHERE email='${email}';
    `);
    console.log("existing user:", existingUser);

    if (existingUser.length === 0) {
      const error = new Error("EMAIL_Unexist");
      error.statusCode = 400;
      throw error;
    }

    console.log("existing user:", existingUser);
    console.log("email", "password");

    console.log(password);

    //if (password !== existingUser[0].password) {
    //  const error = new Error("INVALID_PASSWORD");
    //  error.statusCode = 400;
    //  throw error;
    // }

    // 해당 email의 해쉬된 패스워드가 DB에 있는가
    const hashPw = await bcrypt.compare(password, existingUser[0].password);
    console.log(hashPw)

    if (!hashPw) {
      const error = new Error("passwordError");
      error.statusCode = 400;
      error.code = "passwordError";
      throw error;
    } // 보안을 위해 비밀번호, 패스워드 중 오류 알려주지 않기로 

    // 로그인 성공 시 토큰 발급 -> jwt.sign함수
    const token = jwt.sign({ id: existingUser[0].id }, process.env.TYPEORM_JWT);
    return res.status(200).json({
      message: "LOGIN_SUCCESS 로그인 성공하였습니다",
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// 서버 구동 
const portNumber = process.env.PORT || 8000;

const start = async () => {
  try {
    await server.listen(portNumber);
    console.log(`Server is listening on ${portNumber}`);
  } catch (err) {
    console.error(err);
  }
};

start();

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});


//게시물 생성 Create
app.post ("/createpost", async (req, res) => {
try {
  // 1. 회원만 게시물 작성 가능 (header에서 '토큰 확인'=req.headers.authorization)
  const token = req.headers.authorization; 
  if(!token){
    const error = new Error ("TOKEN_ERROR 게시물 작성 권한이 없습니다");
    error.statusCode = 400;
    error.code = "TOKEN_ERROR"
    throw error;
  }
  // 2. '토큰 검증'= jwt.verify함수
  // 첫 인자 token, 두번째 인자 토큰 검증 시크릿키 -> 검증 성공 시 토큰 해독한 내용 return -> 값을 변수 id에 할당 
  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);

  // 3. 토큰 검증 성공 시, 게시물 생성 함수 
  const {content} = req.body 
  // 게시물 공백 허용하지 않음, 한 글자라도 있어야 함
  if (content.length === 0 ) {
    const error = new Error("CONTENT_TOO_SHORT 1글자 이상 적어주세요"); 
    error.status = 400;
    error.code="CONTENT_TOO_SHORT"
    throw error;
  }
  // 4. 게시물 내용 DB에 저장 
  const newPost = await myDataSource.query(`
  INSERT INTO threads (
    user_id, content
  )VALUES (
    '${id}
    '${content}'
  );4
  `);
  console.log("new Post ID:", newPost.id);
  console.log("new Post Content:", newPost.content);

  // 성공 시 반환 
  return res.status(200).json({message: "POST CREATED 게시물 생성 완료"}); //code: 로 하는 건가?
  } 
   // if 에서 fasle면 throw error- catch error
   catch(error){
  console.log(error);
  return res.status(400).json({message:"FAILED"});
}
});

// 게시물 목록 조회 Read 
app.get("/readpost", async (req, res) => {
try{
  const getPost = await myDataSource.query(`
    SELECT  
    user.id,
    users.nickname, threads.id AS postID, 
    `);
  return res.status(200).json({message:"POST LIST 게시물 목록 조회"}) 
  }
  catch(error){
  console.log(error);
  return res.status(400).json({message:"FAILED"})
  }
} //code 성공, error.code 실패 or message:성공, message:실패 

// 게시물 수정 Update 
app.post("/updatepost", async (req, res) => {
  try{

  }catch(error){
    console.log(error);
  }
})

// 게시물 삭제 Delete 
app.post("/deletepost", async (req, res) => {
  try{
    
  }catch(error){
    console.log(error);
  }
})