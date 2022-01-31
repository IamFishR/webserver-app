const request = require('postman-request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFrZXNoNDQiLCJhIjoiY2t4em4yNHNjMDY5NDJ3cWQyMXd5dmV1bCJ9.7KfKpwEVo8kh548jpck8xA'

    request({
        url: url,
        json: true,
    }, (error, response) => {
        if(error) {
            callback(error, undefined)
        } else {
            if(response.body.features.length != 0) {
                callback(undefined, {
                    latitude: response.body.features[0]['geometry']['coordinates'][1],
                    longitude: response.body.features[0]['geometry']['coordinates'][0]
                })
            } else {
                callback('Unable to find the location.Try another one', undefined)
            }
        }
    })
}

module.exports = geocode