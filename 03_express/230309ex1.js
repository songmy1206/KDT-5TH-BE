// @ts-check

const express = require('express');

const app = express();
const PORT = 4000;
// 회원관련 라우터 생성.
const userRouter = express.Router();

const USER = {
  1: {
    email: 'smy',
    name: '송민영',
  },
  2: {
    email: 'my',
    name: '민영',
  },
};

const USER_ARR = [
  {
    id: 'smy',
    name: '송민영',
  },
  {
    id: 'pororo',
    name: '뽀로로',
  },
];

app.set('view engine', 'ejs');

// 라우터를 위한 미들웨어 설정 : use
// /users 라는 url 로 들어오면 -> userRouter 로 처리해준다.
app.use('/users', userRouter);

// http://localhost:4000/users
userRouter.get('/', (req, res) => {
  res.send(USER);
});

// parmater 값으로 /id/:id 값이 넘어온 경우.
userRouter.get('/id/:id', (req, res) => {
  // id 값을 숫자 값으로 받아 USER[1] 번 을 send 해준다.
  const userData = USER[req.params.id];
  console.log(userData);
  if (userData) {
    res.send(userData);
  } else {
    res.send('ID를 못찾겠어요');
  }
});

// 회원 등록 post 방식 (추가)
userRouter.post('/add', (req, res) => {
  // id와 name 이 잘넘어온다면
  if (req.query.id && req.query.name) {
    // 넘어온 id 와 name 을 가지고 객체를 만든다.
    const newUser = {
      id: req.query.id,
      name: req.query.name,
    };
    // 객체의 키값을 하나 늘려주면서 newUser 값을 키에 맞게 삽입한다.->이부분 다시보기
    USER[Object.keys(USER).length + 1] = newUser;
    res.send('회원 등록완료');
  } else {
    res.end('Unexpected query');
  }
});

// 회원 수정 -> query 방식
userRouter.put('/modify/:id', (req, res) => {
  // 쿼리 값으로 email 과 이름이 들어온 경우에만 수정을해라.
  if (req.query.email && req.query.name) {
    if (req.params.id in USER) {
      // req.params.id 값이 USER에 키값으로 있으면?
      USER[req.params.id] = {
        email: req.query.email,
        name: req.query.name,
      };
      res.send('회원 정보 수정완료');
    } else {
      res.send('해당 ID를 가진 회원이 존재하지않습니다.');
    }
  } else {
    res.send('쿼리 입력을 확인해주세요');
  }
});

// 회원 삭제
userRouter.delete('/delete/id/:id', (req, res) => {
  if (req.params.id in USER) {
    delete USER[req.params.id];
    res.send('회원 삭제완료');
  } else {
    res.send('회원 정보를 가진 사람이 없다.');
  }
});

// 서버 전체에 대한 기본주소.
// app.use('/', (req, res) => {
//   res.send('여기는 홈화면');
// });

userRouter.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web Page</h1>');
  for (let i = 0; i < USER_ARR.length; i++) {
    res.write(`<h2>USER ID is ${USER_ARR[i].id}</h2>`);
    res.write(`<h2>USER NAME is ${USER_ARR[i].name}</h2>`);
  }
  res.end();
});

app.listen(PORT, () => {
  console.log(`${PORT} 번에서 실행중입니다.`);
});
