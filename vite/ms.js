// let arr = [1,2,3,4,4,1]
// let newArr = arr.reduce((pre,cur)=>{
//     if(!pre.includes(cur)){
//       return pre.concat(cur)
//     }else{
//       return pre
//     }
// },[])
// console.log(newArr);

// function red() {
//     console.log("red");
//   }
//   function green() {
//     console.log("green");
//   }
//   function yellow() {
//     console.log("yellow");
//   }
//   const light = function (timer, cb) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         cb()
//         resolve()
//       }, timer)
//     })
//   }
//   const step = function () {
//     Promise.resolve().then(() => {
//       return light(3000, red)
//     }).then(() => {
//       return light(2000, green)
//     }).then(() => {
//       return light(1000, yellow)
//     }).then(() => {
//       return step()
//     })
//   }
  
//   step();

const numbers = [1, 2, 3];
numbers[10] = 9;
console.log(numbers);
