const request = require('postman-request')



const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c96230be5ef11df713393c4b37fd179f&query=' + lat + ',' + long

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
                    console.log(response)
                    const unit = response.body.request.unit
                    const rain_prob = response.body.current.feelslike
                    const temp = response.body.current.temperature
                    const place_name = response.body.location.name
                    callback(undefined, {
                        rain_prob: rain_prob,
                        temp: temp,
                        place_name: place_name,
                        unit: unit,
                        resp: response
                    })
                    // callback(undefined,"It is currently " + temp + " " + unit + " in " + place_name + ". It feels like " + rain_prob + " " + unit + " out")
                }
            }
        }
    )
}



module.exports = forecast