// @ts-check

const express = require('express');

const userRouter = require('./routes/users');

const app = express();
const PORT = 4000;

// 회원관련 라우터 생성.
// const userRouter = express.Router();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// 라우터를 위한 미들웨어 설정 : use
// /users 라는 url 로 들어오면 -> userRouter 로 처리해준다.
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`${PORT} 번에서 실행중입니다.`);
});
