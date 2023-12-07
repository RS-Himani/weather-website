const request = require('postman-request')

console.log('Starting Geocode Process')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?types=address&access_token=pk.eyJ1IjoicmhiZCIsImEiOiJjbHBqazM5Y20wMHFlMmpxdnZ3aXF2cng5In0.fbM6l5m83rw-Vlr8ib05HQ'
    
    request({url: url, json: true}, (error, response) => {
        
        if(error){
            callback('Unable to connect to the location service !', undefined)
            
        } else if(response.body.error) {
            callback('Unable to reach to the API: ', undefined)
           
        }else if(response.body.features.length === 0) {
            callback('Unable to find location please reenter the appropriate location ', undefined)
            
        } else {
            callback(undefined, {
                Process: 'geocode',
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    } )
}

console.log('Processing Geocode')

module.exports = geocode
