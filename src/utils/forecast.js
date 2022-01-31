const request = require('postman-request')



const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c96230be5ef11df713393c4b37fd179f&query=' + lat + ',' + long + '&units=m'

    request(
        {
            url: url,
            json: true,
        },
        (error, response) => {
            if (!error) {
                if (response.body.success == false) {
                    callback(response.body.error.type + ' - ' + response.body.error.info, undefined);
                } else {
                    callback(undefined, {
                        resp: response,
                        obs_time: response.body.current.observation_time,
                        rain_prob: response.body.current.feelslike,
                        temp: response.body.current.temperature,
                        precip: response.body.current.precip,
                        humidity: response.body.current.humidity,
                        wind_speed: response.body.current.wind_speed,
                        unit: response.body.request.unit,
                        weather: response.body.current.weather_descriptions,
                        is_day: response.body.current.is_day,
                        place_name: response.body.location.name,
                        region: response.body.location.region,
                        country: response.body.location.country,
                        time: response.body.location.localtime,
                        para: "It is currently " + response.body.current.temperature + " " + response.body.request.unit + " in " + response.body.location.name +
                         ". It feels like " + response.body.current.feelslike + " " + response.body.request.unit + " out",
                    })
                }
            }
        }
    )
}



module.exports = forecast