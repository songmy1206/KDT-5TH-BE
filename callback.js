// @ts-check

function buySync(item, price, quantity, callback) {
  console.log(`${item} 상품을 ${quantity}개 골라서 점원에게 줌`);
  setTimeout(() => {
    console.log('계산 필요');
    const total = price * quantity;
    callback(total);
  }, 2000);
}

function pay(total) {
  console.log(`${total}원을 지불함`);
}

buySync('포켓몬빵', 1000, 5, pay);
