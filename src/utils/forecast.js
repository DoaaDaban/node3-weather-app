const request= require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0463d16af6d27a1dc85d5f14bac24e18&query=${long},${lat}&units=f`
  
    request({ url, json: true }, (err, {body}) => {
      if (err) {
        callback("unable to connect to server", undefined);
      } else if (body.error) {
          callback("unable to find location", undefined);
      } else {
        callback(undefined, "its currently " + body.current.temperature);
      }
    });
  };

  module.exports = forecast