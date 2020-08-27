//It will require and run our main fetch function.
const { fetchMyIP } = require("./iss");


//Tested function working
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });