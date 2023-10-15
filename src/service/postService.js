const jwt = require('jsonwebtoken')
const {postDao} = require('../models')

const createPost = async (req, res) => {
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
      } //메세지 기니까, 팀원들끼리 코드 분리 시 따로 써주는 
    
      // 4. 게시물 내용 DB에 저장 
      const newPost = await postDa0.createPostStorageData(id, content)
      console.log("new Post ID:", newPost.id);
      console.log("new Post Content:", newPost.content);
    
      // 성공 시 반환 
      return res.status(200).json({message: "POST CREATED 게시물 생성 완료"}); 
      } 
       // if 에서 fasle면 throw error- catch error
      catch(error){
      console.log(error);
      return res.status(400).json({message:"FAILED"});
    }};
    
//게시물 조회
const readPost = async (req, res) => {
        try{
          console.log(req.body) //req 변수 사용해주기 위해 (회색표시)
          const getPost = await postDao.readPostList(threads.id, content, createdAt)
// ()는 post id 로 하나의 post 가져올 때, 전체 목록이면 필요 없음 select * from 하면 되니
          return res.status(200).json({message:"POST LIST 게시물 목록 조회"}) 
        
          console.log(getPost)
        } catch(error){
          console.log(error);
          return res.status(400).json({message:"FAILED"})
          }
    } //code 성공, error.code 실패 or message:성공, message:실패 
        // image 가져올 때 user id 
    
// 게시물 삭제
const deletePost = async (token, postId) => {
    try{
      //1. 토큰 검증 (회원인지)
      // 회원만 게시물 작성 가능 (header에서 '토큰 확인'=req.headers.authorization)
    const token = req.headers.authorization; 
    if(!token){
    const error = new Error ("TOKEN_ERROR 게시물 삭제 권한이 없습니다");
    error.statusCode = 400;
    error.code = "TOKEN_ERROR"
    throw error;
    }
          // '토큰 검증'= jwt.verify함수
          // 첫 인자 token, 두번째 인자 토큰 검증 시크릿키 -> 검증 성공 시 토큰 해독한 내용 return -> 값을 변수 id에 할당 
   const {id} = jwt.verify(token,process.env.TYPEORM_JWT);
    //token변수 선언된 'req.headers.authorization의 id를 가져온다. 
    //토큰 검증 성공 시, 게시물 생성 함수 
          
   //2. 작성한 게시물의 주인이 맞는지 (아무나꺼 건드리면 안 되니) -> if 중복 확인 
   // body에서 content를 가져와야 함 
   const existingUser = await postDao.getDeletingPost(id,email, password)
   if (existingUser.length === 0) {
   const error = new Error("삭제할 권한이 없습니다");
   error.statusCode = 400;
   throw error;
   }
   
   //3. 게시물 삭제 
   const {content} = req.body   //회색으로 뜨는 건, 변수 사용이 안 돼서, 아래에서 쓰이지 않아서 -> console.log만 찍어도 흰색 됨
   console.log(content)
   // user id, post id, createddate select from DB 
   const deletePost = await myDataSource.query(`
   DELETE FROM threads WHERE users.id=${id} and post.id=${postId}
   `)//threads 테이블의 userd_id (fk), post_id(pk), created_at

    console.log(deletePost) //deltePost 변수 사용해주기 위해 (회색표시 -> 흰색)
    return res.status(200).json({message:"DELETE POST 게시물 삭제"}) 
    } catch(error){
    console.log(error);
    return res.status(400).json({message:"FAILED"});
    // return res.status(400).json(error);  -> 메세지 매번 던지기 힘드니, error라는 공용함수 사용 시 
    };
    }
    
const updatePost = async (req, res) => {
  try {
  // 1. 토큰 확인, 검증 (회원인지)
  // 회원만 게시물 작성 가능 (header에서 '토큰 확인'=req.headers.authorization)
  const token = req.headers.authorization; 
  if(!token){
  const error = new Error ("TOKEN_ERROR 게시물 수정 권한이 없습니다");
  error.statusCode = 400;
  error.code = "TOKEN_ERROR"
  throw error;
  }
  // '토큰 검증'= jwt.verify함수
  // 첫 인자 token, 두번째 인자 토큰 검증 시크릿키 -> 검증 성공 시 토큰 해독한 내용 return -> 값을 변수 id에 할당 
  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);
   //token변수 선언된 'req.headers.authorization의 id를 가져온다. 
   //토큰 검증 성공 시, 게시물 생성 함수 
            
   //req.body에서 content를 가져온다
   const {content} = req.body 
   console.log (content) //content 변수 사용해주기 위해 (회색표시 -> 흰색)
        
        
   //2. 작성한 게시물의 주인이 맞는지 (아무나꺼 건드리면 안 되니) if 중복 비교 
   const updatingUser = await myDataSource.query(`SELECT id, email, password FROM users WHERE email='${email}'
   `);
    console.log("updatingUser:", updatingUser);
        
    if (updatingUser.length === 0) {
    const error = new Error("수정 권한이 없습니다");
    error.statusCode = 400;
    error.code = "unauthorized user"
    throw error;
    }
        
  //3. 게시물 수정
// userID, postId, createdDate select from DB 
    const updatingPost = await myDataSource.query(`
    UPDATE threads SET content = "Modified Title"
    WHERE id= ? ; 
    `)
    console.log(updatingPost)
    const error = new Error ("게시물 수정 실패");
    error.statusCode = 400;
    error.code="Modify Failed"
    throw error;
    return res.status(200).json({message:"POST UPDATED 수정 완료"})
    } 
    catch(error){
    console.log(error);
    return res.status(400).json({message:"Failed"});
    }
    }

    module.exports = {
        "createPost" : createPost, 
        "readPost": readPost,
        "deletePost": deletePost,
        "updatePost": updatePost
    }