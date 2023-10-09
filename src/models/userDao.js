const {myDataSource} = require('./dataSource.js')

// service에서 sql 관련 
const getUserInfoByEmail = async (email)=> { 
const userData = await myDataSource.query(`
SELECT id, email FROM users WHERE email='${email}';   
`);
console.log("existing user:", existingUser);

return userData
}

const storeUserData = async ()=>{
myDataSource.query(`
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
      `)};

module.exports = {
    getUserInfoByEmail,
    storeUserData
}