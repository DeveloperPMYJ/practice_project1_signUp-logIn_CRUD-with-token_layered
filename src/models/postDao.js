const {myDataSource} = require('./dataSource.js')

const createPost = async (id, content) => {
    const newPost = await myDataSource.query(`
      INSERT INTO 
        threads (
          user_id, 
          content
      )
      VALUES (
        '${id}',
        '${content}'
      )
      `)
      return newPost
      }
      
      console.log (newPost);

// 모든 data 조회, read? 
const getPost = async (postId) => {
  const readData = await myDataSource.query(`
            SELECT *
            FROM threads 
            WHERE threads.id = ${postId}
            `); 
    return readData
} 

const deletePost = async (userId, threadsId) => {
  const deletingPostData = await myDataSource.query(`
    DELETE FROM 
      threads
    WHERE user_id='${userId}', threads.id=${threadsId};
    `);
    return deletingPostData
}

const updatePost = async (userId, threadsId, newContent, updatedAt) => {
  const updatingPostData = await myDataSource.query(`
    UPDATE threads
    SET 
      content = '${newContent}', updatedAt = NOW ()
    WHERE user_id='${userId}' AND threads.id=${threadsId};
  `);
  return updatingPostData
}

  module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost 
          }