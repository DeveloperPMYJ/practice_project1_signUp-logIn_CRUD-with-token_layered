// service에서 sql 관련 

const {myDataSource} = require('./dataSource.js')


const getUserdata = async () => {
    const userData = await userDao.query(
        "SELECT id, nickname, email FROM USERS "
    );
    return userData; 
}


// 회원가입 : 이메일 중복 확인 -> email 받아와서 
const getUserInfoByEmail = async (email)=> { 
    console.log('models connected')

    const userData = await myDataSource.query(`
        SELECT id, email FROM users WHERE email='${email}';   
`);
    return userData
}

//회원가입 후 'email, password, nickname' 가져와서 저장 
const createUser = async (email, hashedPw, nickname)=>{
    const newUser = await myDataSource.query(`
    INSERT INTO users (                    
        email, 
        password,
        nickname
        )
    VALUES (
        '${email}',
        '${hashedPw}', 
        '${nickname}'
        )
    `)
    return newUser 
    };

// 로그인 시 DB에 email 있는지, email 가져오기 
const verifyUser = async (email) => {
    const existingUser = myDataSource.query(`
    SELECT id, email, password FROM users WHERE email='${email}';
    `);
    return existingUser
    };

    
module.exports = {
    getUserdata,
    getUserInfoByEmail,
    createUser,
    verifyUser
}