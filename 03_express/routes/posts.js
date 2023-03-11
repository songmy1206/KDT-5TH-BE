const express = require('express');

const router = express.Router();

const POST = [
  {
    title: '제목',
    content: '작성',
  },
];

// http://localhost:4000/posts
router.get('/', (req, res) => {
  res.render('posts', { POST, postCounts: POST.length });
});

// 글 추가
router.post('/add', (req, res) => {
  if (Object.keys(req.body).length >= 1) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POST.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('폼데이터 입력확인바람');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('데이터가 입력되지 않음');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res) => {
  const postIndex = POST.findIndex((post) => post.title === req.params.title);
  if (postIndex !== -1) {
    POST.splice(postIndex, 1);
    res.send('글삭제 완');
  } else {
    const err = new Error('글존재x');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
