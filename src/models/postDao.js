const {myDataSource} = require('./dataSource.js')

const createPost = async (userId, content) => {
    const newPost = await myDataSource.query(`
      INSERT INTO 
      threads (
        user_id, 
        content
      )
      VALUES (
        '${userId}',
        '${content}'
      )
      `)
      return newPost
      }

// 모든 data 조회, read? 
const getPost = async () => {
  const readData = await myDataSource.query(`
            SELECT *
            FROM threads 
            `); 
    return readData
} 

const deletePost = async (userId, threadsId) => {
  const deletingPostData = await myDataSource.query(`
    DELETE FROM 
    threads
    WHERE user.id='${userId}', threads.id=${threadsId};
    `);
    return deletingPostData
}

const updatePost = async (userId, threadsId, content, createdAt) => {
  const updatingPostData = await myDataSource.query(`
    UPDATE  
      userId, threadsId, content, creatdAt 
    SET 
      threads 
    WHERE email='${email}'
  `);
  return updatingPostData
}

  module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost 
          }