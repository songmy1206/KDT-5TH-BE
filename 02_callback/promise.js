const promise = new Promise((resolve, reject) => {
  const tetz = 'older';
  if (tetz === 'old') {
    setTimeout(() => {
      resolve('tetz is old');
    }, 3000);
  } else {
    reject('tetz is getting old');
  }
});

promise
  //resolve일때 then 실행
  .then((data) => {
    console.log(data);
  })
  .catch((data) => {
    console.log(data);
  });
