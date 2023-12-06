const request = require('postman-request')


console.log('Starting Forecast Process')
const forecast =((latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=481920f98024fe57a8544868af7afd1d&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, response) => {
        
        if(error){
            callback('Unable to connect to the location service !', undefined)
            
        } else if(response.body.error) {
            callback('Unable to reach to the API: ', undefined)
           
        }else {
            callback(undefined, {
                Process: 'forecast',
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: response.body.location.name,
                weather: response.body.current.weather_descriptions[0],
                degreeout:  response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    } )
})

console.log('Processing Forecast')

module.exports = forecast