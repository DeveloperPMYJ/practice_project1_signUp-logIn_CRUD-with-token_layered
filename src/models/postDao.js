const {myDataSource} = require('./dataSource.js')

const createPostStorageData = async (id, content) => {
    const postData= await myDataSource.query(`
      INSERT INTO threads (
        user_id, content
      )VALUES (
        '${id}',
        '${content}'
      )
      `)
      return postData
      }


const readPostList = async (threads.id, content, createAt) => {
   const readData= await myDataSource.query(`
            SELECT  
            threads.id AS postId, 
            threads.content, 
            threads.created_at AS createdAt
            FROM threads
            `); //threads 테이블의 id , content, createe_at 
          return readData
          } 

const getDeletingPost = async (id, email, password) => {
const deleteData= await myDataSource.query(`
          SELECT id, email, password FROM users WHERE email='${email}';
          `);
          return deleteData
            }
          console.log("existing user:", existingUser);
      

          module.exports = {
            createPostStorageData,
            readPostList,
            getDeletingPost
          }