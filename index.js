//It will require and run our main fetch function.
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");


//Tested function working
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//placeholder function for when we implement the testing for this
// fetchCoordsByIP("172.103.216.133", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned Coords:', coords);
// });

fetchISSFlyOverTimes({latitude: '49.34680', longitude: '-124.43610'}, (error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned FlyOverTimes:', flyOverTimes);
});


//Once completed, we should be able to run our index.js file to retrieve the next 5 pass (fly over) times for the ISS.

// > node index.js
// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
// Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
// Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!