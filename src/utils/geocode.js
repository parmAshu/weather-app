const request = require('request');

let geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?access_token={key}";


// function to obtain the latitude and longitude of an area and return the results to the callback function as arguments
const geocode = (area, callback) => {

    // replacing the area name in the request URL

    request( {url : geocodeURL.replace('{location}',encodeURI(area)), json : true} , (error, response)=>{
        if(error){
            callback( 'Unable to connect to location services.', undefined);
        }
        else if( response.body.features.length === 0){
            callback( 'Unable to find the location.', undefined);
        }
        else{
            //console.log('geocode', response.body.features[0]);
            callback( undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

const setKey = (key) => {
    geocodeURL = geocodeURL.replace('{key}', key);
    //console.log(geocodeURL);
}

module.exports = {
    geocode : geocode,
    setKey : setKey
}