// It will contain most of the logic for fetching the data from each API endpoint.
//require the request package
const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      //call the callback with an Error the status code when fetching the body
      //Error create a new error object that we can pass around in this case to the callback to indicate something went wrong.
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
      //or were good to proceed sending the IP to our index.js
    } else {
      const ip = JSON.parse(body).ip;
      // console.log(ip);

      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    } else {

      const { latitude, longitude } = JSON.parse(body).data;

      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISSFlyovers Coordinates for IP: ${body}`), null);
      return;
    } else {
      //response
      const ISSflyOverTimes = JSON.parse(body).response;

      callback(null, ISSflyOverTimes);
    }
  });
};


// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };