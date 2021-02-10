const request = require('request');

let forecastURL = 'http://api.weatherstack.com/current?access_key={key}&query={coordinates}';

const forecast = ( location, callback) => {
    //constructing the forecast URL
    
    request( {url : forecastURL.replace( '{coordinates}',  location.latitude.toString() + ',' + location.longitude.toString() ), json : true}, (error, response)=> {    
        if(error){
            callback("Unable to connect to forecast services.", undefined);
        }
        else if( response.body.error ){
            callback("Unable to find the location.", undefined);
        }
        else{
            //console.log('forecast', response.body.current );
            callback(undefined, { temperature : response.body.current.temperature, humidity : response.body.current.humidity, feelslike : response.body.current.feelslike } );
        }
    });
}

const setKey = (key) => {
    forecastURL = forecastURL.replace('{key}', key);
    //console.log(forecastURL);
}

module.exports = {
    forecast : forecast,
    setKey : setKey
}