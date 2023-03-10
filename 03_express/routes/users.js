const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'smy',
    name: '송민영',
    email: 'songmy1206',
  },
  {
    id: 'pororo',
    name: '뽀로로',
    email: 'pororo0000',
  },
];

// http://localhost:4000/users
router.get('/', (req, res) => {
  res.render('users', { USER, userCounts: USER.length });
});

// parmater 값으로 /id/:id 값이 넘어온 경우.
router.get('/id/:id', (req, res) => {
  // id 값을 숫자 값으로 받아 USER[1] 번 을 send 해준다.
  // const userData = USER[req.params.id];
  // console.log(userData);
  // const userData = USER.find((user) => user.id === req.params.id);
  // if (userData) {
  //   res.send(userData);
  // } else {
  //   res.send('ID를 못찾겠어요');
  // }
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('해당 ID를 가진 회원이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 등록 post 방식 (추가)
router.post('/add', (req, res) => {
  // // id와 name 이 잘넘어온다면
  // if (req.query.id && req.query.name) {
  //   // 넘어온 id 와 name 을 가지고 객체를 만든다.
  //   const newUser = {
  //     id: req.query.id,
  //     name: req.query.name,
  //   };
  //   // 객체의 키값을 하나 늘려주면서 newUser 값을 키에 맞게 삽입한다.->이부분 다시보기
  //   USER[Object.keys(USER).length + 1] = newUser;
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록완료');
    } else {
      const err = new Error('쿼리입력 오류');
      err.statusCode = 400;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('폼태그 입력확인바람');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('데이터가 입력되지 않음');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 수정 -> query 방식
router.put('/modify/:id', (req, res) => {
  // // 쿼리 값으로 email 과 이름이 들어온 경우에만 수정을해라.
  // if (req.query.email && req.query.name) {
  //   if (req.params.id in USER) {
  //     // req.params.id 값이 USER에 키값으로 있으면?
  //     USER[req.params.id] = {
  //       email: req.query.email,
  //       name: req.query.name,
  //     };
  //     res.send('회원 정보 수정완료');
  //   } else {
  //     res.send('해당 ID를 가진 회원이 존재하지않습니다.');
  //   }
  // } else {
  //   res.send('쿼리 입력을 확인해주세요');
  // }
  if (req.query.name && req.query.email) {
    const userIndex = USER.findIndex((user) => user.id === req.params.id);
    if (userIndex !== -1) {
      USER[userIndex] = {
        id: req.params.id,
        name: req.query.name,
        email: req.query.email,
      };
      res.send('회원 정보 수정 완료');
    } else {
      const err = new Error('회원존재x');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('쿼리입력 오류');
    err.statusCode = 400;
    throw err;
  }
});

// 회원 삭제
router.delete('/delete/:id', (req, res) => {
  // if (req.params.id in USER) {
  //   delete USER[req.params.id];
  //   res.send('회원 삭제완료');
  // } else {
  //   res.send('회원 정보를 가진 사람이 없다.');
  // }
  const userIndex = USER.findIndex((user) => user.id === req.params.id);
  if (userIndex !== -1) {
    USER.splice(userIndex, 1);
    res.send('회원삭제 완');
  } else {
    const err = new Error('회원존재x');
    err.statusCode = 404;
    throw err;
  }
});

// 서버 전체에 대한 기본주소.
// app.use('/', (req, res) => {
//   res.send('여기는 홈화면');
// });

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web Page</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER ID is ${USER[i].id}</h2>`);
    res.write(`<h2>USER NAME is ${USER[i].name}</h2>`);
    res.write(`<h2>USER EMAIL is ${USER[i].email}</h2>`);
  }
  res.end();
});

router.get('/ejs', (req, res) => {
  const userCounts = USER.length;
  res.render('index', { USER, userCounts });
});

module.exports = router;
