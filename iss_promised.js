//iss_promised.js
const request = require('request-promise-native');

const fetchMyIp = () => {
  return request("https://api.ipify.org?format=json");
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
}

const fetchISSFlyOverTimes = (body) => {
  //we're parsing fetchcoords data at this time
  const {latitude, longitude} = JSON.parse(body).data;
  //now we're returning the get request from iss-pass
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = {nextISSTimesForMyLocation};