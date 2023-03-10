// @ts-check

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

const mainRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

// 회원관련 라우터 생성.
// const userRouter = express.Router();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터를 위한 미들웨어 설정 : use
// localhost:4000
app.use('/', mainRouter);
// /users 라는 url 로 들어오면 -> userRouter 로 처리해준다.
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express world!');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message + `<br/><a href="/">홈</a>`);
});

app.listen(PORT, () => {
  console.log(`${PORT} 번에서 실행중입니다.`);
});
