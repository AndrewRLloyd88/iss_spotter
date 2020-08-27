//It will require and run our main fetch function.
const { fetchMyIP, fetchCoordsByIP } = require("./iss");


//Tested function working
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//placeholder function for when we implement the testing for this
fetchCoordsByIP("172.103.216.133", (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned Coords:', coords);
});