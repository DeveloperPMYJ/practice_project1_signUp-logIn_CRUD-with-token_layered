const signUp = async (req, res) => {
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
const logIn = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Key error
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
  

  module.exports = {
    "signUp" : signUp,
    "logIn":logIn
  }