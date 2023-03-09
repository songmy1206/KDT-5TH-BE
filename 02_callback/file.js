// @ts-check

const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

const str = '파일쓰기 테스트';

fs.writeFile('test1.txt', str, 'utf-8', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('파일 쓰기 완');
  }
});
