const express = require('express');

const router = express.Router();

const POST = [
  {
    title: '제목',
    content: '작성',
  },
];

// http://localhost:4000/users
router.get('/', (req, res) => {
  res.render('posts', { POST, userCounts: POST.length });
});

router.post('/add', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST.push(newPost);
      res.send('글 등록완료');
    } else {
      const err = new Error('입력 오류');
      err.statusCode = 400;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POST.push(newPost);
      res.redirect('/posts');
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

module.exports = router;
