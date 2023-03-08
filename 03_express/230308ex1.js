// @ts-check

const express = require('express');

const server = express();

const PORT = 4000;

server.get('/:email/:password/:name/:gender', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

server.get('/', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

server.listen(PORT, () => {
  console.log(`${PORT}번 실행중`);
});
