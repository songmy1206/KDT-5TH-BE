function funcHell(callback) {
  callback();
}

funcHell(() => {
  console.log('1번 인척하는 새로 만든 익명함수');
  funcHell(() => {
    console.log('2번 인척하는 새로 만든 익명함수');
    funcHell(() => {
      console.log('3번 인척하는 새로 만든 익명함수');
    });
  });
});
