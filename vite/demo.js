// function sum(n) {

//     var sum=0; 

//     for (var i=1;i<=n;i++){

//         sum += i;

//     }

//     console.log(sum);

// }
// sum(2)

// function sum(n){
//     let demo =  0
//     for(i=0;i<=n;i++){
//         demo += i
//     }
//     console.log(demo)
// }

// sum(3)

// function demo(){
//     const one = (false || null)
//     console.log(one)
// }
// demo()

// function demo (){
//     [[0,1],[2,3]].reduce(
//         (acc,cur) => {
//             return acc.concat(cur);
//         },
//         [1,2]
//     )
// }
// demo()

// const person = {name: "Tom"};
//  function demo(age){
//     console.log(`${this.name} is ${age}`);
//  }
// demo.call(person, 21);
// demo.bind(person, 21);


// function getAge() {
//     'use strict'
//      age = 21
//     console.log(age)
//   }
  
//   getAge()

// function demo(num){
//   console.log(num*5)
// }

// setTimeout(async function(){
//   await demo(5);
//   console.log('1')

// });

// new Promise(async function(resolve){
//   await demo(3);
//   console.log('2');
//     resolve();
// }).then(async function(){
//   await demo(6);
//  console.log('3')
// });

// console.log('4')


function demo(i){
  if(i == 1){
    return i
  }
 return i +=(i-1)
}



// function demo(n){
//   var num =0;
//   for(var i=0;i<n;i++){
//    num += i;
//   }
//   console.log(num)
// }

demo(5)

// function demo() {
//     let num = 0
//     function demo1(){
//     return  ++num
//     }
// }
// const b = demo()
// console.log(b())
// console.log(b())

// console.log('1');

// setTimeout(function() {
//     console.log('2');

//     process.nextTick(function() {
//         console.log('3');
//     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// process.nextTick(function() {
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })

// setTimeout(function() {
//     console.log('9');
//     process.nextTick(function() {
//         console.log('10');
//     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })
// function request(num) { // 模拟接口请求
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(num * 2)
//       }, 1000)
//     })
//   }
  
//   request(1).then(res1 => {
//     console.log(res1) // 1秒后 输出 2
  
//     request(2).then(res2 => {
//       console.log(res2) // 2秒后 输出 4
//     })
//   })
// let p1 = new Promise((resolve, reject) => {
//     resolve('成功')
//     reject('失败')
// })
// console.log('p1', p1)

// let p2 = new Promise((resolve, reject) => {
//     reject('失败')
//     resolve('成功')
// })
// console.log('p2', p2)

// let p3 = new Promise((resolve, reject) => {
//     throw('报错')
// })
// console.log('p3', p3)
// const numbers = [1, 2, 3];
// numbers[10] = 11;
// console.log(numbers);
// return 1

// function demo(n){
//    var sum=0
//   for(let i=0;i<n;i++){
//     sum +=i
//   }
//   console.log(sum)
// }

// demo(10)