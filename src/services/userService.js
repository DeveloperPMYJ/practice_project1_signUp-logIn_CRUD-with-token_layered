const jwt = require ('jsonwebtoken')
const {userDao} = require ('../models')


const getUsers = async () => {
    const userData = await userDao.getUserdata(id, nickname, email)
    return userData; 
};

// 비즈니스 로직은 남긴다
// service파일에서는 기존의 req,res 필요없고,
// controller에서 받은 email, password를 곧바로 넣어줌

const signUp = async (email, password, nickname) => {
    console.log('user service connected')

      if (password.length < 10) {
        const error = new Error("INVALID_PASSWORD, longer than 10 characters");
        error.statusCode = 400;
        throw error;
      }

      const [existingUser] = await userDao.getUserByInfoByEmail(email)
      if (existingUser.length > 0) {
        const error = new Error("DUPLICATED_EMAIL_ADDRESS");
        error.statusCode = 400;
        throw error;
      }
      
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      if (!email.match(emailRegex)) {
        const error = new Error("유효하지 않은 이메일 주소 형식입니다");
        error.statusCode = 400;
        throw error;
      }

      const saltRounds = 10;
      const hashedPw = await bcrypt.hash(password, saltRounds);
  
      // Database에 유저 정보 저장 
      const newUser = await userDao.createUser(email,hashedPw,nickname)
      return newUser
    }
  
  
  // 로그인 
const logIn = async (email) => {
    try {

     // 이메일 DB에 있는가
    const existingUser = await userDao.verifyUser(email)
    
    if (existingUser.length === 0){
    const error = new Error("EMAIL_Unexist");
    error.statusCode = 400;
    throw error;    
    }
  
    // 해당 email의 해쉬된 패스워드가 DB에 있는가
    const hashPw = await bcrypt.compare(password, existingUser[0].password);
  
    if (!hashPw) {
    const error = new Error("passwordError");
    error.statusCode = 400;
    error.code = "passwordError";
    throw error;
    } // 보안을 위해 비밀번호, 패스워드 중 오류 알려주지 않기로 
    
    // 로그인 성공 시 토큰 발급 -> jwt.sign함수
    const token = jwt.sign({ id: existingUser[0].id }, process.env.TYPEORM_JWT);
    return token;
    } catch (error) {
      throw error;
    }
}
  
  module.exports = {
    "signUp" : signUp,
    "getUsers": getUsers,
    "logIn":logIn 
  }