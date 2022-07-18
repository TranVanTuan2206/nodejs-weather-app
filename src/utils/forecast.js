const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=61f0b57900fd06968632ce3db3194100&query=${lat},${long}&units=m`;
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const current = body.current;
            const temp = current.temperature;
            const feelsLike = current.feelslike;
            const describe = current.weather_descriptions[0]
            callback(undefined,`${describe}. It is currently ${temp}c degrees out. It feels like ${feelsLike}c degrees out`);
        }
    })
}

module.exports = forecast;