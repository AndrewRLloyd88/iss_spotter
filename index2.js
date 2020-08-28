const { nextISSTimesForMyLocation } = require("./iss_promised");

const printNextFlyovers = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printNextFlyovers(passTimes);
  })
  .catch((error) => {
    //error.message is one property on an object returned
    console.log("It didn't work: ", error.message);
  });
             