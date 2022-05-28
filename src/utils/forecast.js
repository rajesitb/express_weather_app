const request = require('request');

weather_stack_api = '466e37fcf3f76d213f9dbb754f104dcb';

const reverse_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoicmFqZXNpdGIiLCJhIjoiY2wzbGd3bXQ2MDBhODNqcGZudTNqajY4byJ9.M_-fxihKsHUPRnDt1f6tCw'

const weatherForecast = (long, lat, callback) => {
    // console.log('weather forecast', lat, long)
    const url = 'http://api.weatherstack.com/current?access_key='+weather_stack_api+'&query='+lat+','+long+'&units=f';
    console.log(url)
    
    
// destructured response.body to body. naming shorthand for url
    request({url, json:true}, (error, {body}) => {

        if (error){
            callback('There has been an error');
        }else{
            // const placeName = response.body.features[0].place_name
            // console.log(response.body.features[0].geometry)
            // callback(response.body.features[0].center)                 
            callback(body);
        }

    });

};



module.exports = {
    weatherForecast: weatherForecast

};