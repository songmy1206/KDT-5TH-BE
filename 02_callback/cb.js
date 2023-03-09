/*
function func1(callback) {
  console.log('1번 함수');
  function fakeFunc3() {
    console.log('3번 인척 하는 함수');
  }
  callback(fakeFunc3);
}

function func2(callback) {
  console.log('2번 함수');
  callback();
}

function func3() {
  console.log('3번 함수');
}

func1(() => {
  console.log('2번 인척하는 새로 만든 익명함수');
});
*/

function multiplication(number, callback) {
  let answer = 0;
  setTimeout(() => {
    answer = number * number;
    callback(answer);
  }, 2000);
}

function say(result) {
  console.log(result);
}

multiplication(3, say);
