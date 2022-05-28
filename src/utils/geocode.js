const request = require('request');
const map_box_api = 'pk.eyJ1IjoicmFqZXNpdGIiLCJhIjoiY2wzbGd3bXQ2MDBhODNqcGZudTNqajY4byJ9.M_-fxihKsHUPRnDt1f6tCw'
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+map_box_api+'&limit=1'

    request({url, json: true}, (error, {body}) => {
        
        if(error){

            callback('Cant connect to location services', undefined);
        }else{       
            console.log('coming for geocode', body.features.lenght===undefined, body);            
                callback(error, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                response:body.features[0].center
                });       
              
             }        
    });
};

module.exports = {
    geocode: geocode
};