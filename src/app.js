const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const public = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// next line is for Heroku, also in package.json, the scripts is changed
const port = process.env.PORT || 3000;
const map_box_api = 'pk.eyJ1IjoicmFqZXNpdGIiLCJhIjoiY2wzbGd3bXQ2MDBhODNqcGZudTNqajY4byJ9.M_-fxihKsHUPRnDt1f6tCw'
const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Shillong.json?access_token='+map_box_api+'&limit=1&units=f'
//to make nodemon save changes made to files other than js, use :
//nodemon app.js -e js, hbs, html
app.set('view engine', 'hbs');
// set a different path on express to get the dynamic template other than folder named views
app.set('views', dynamicPath);
app.use(express.static(public));
// now register the partials to hbs. these are base files to be used in all other files
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rajesh',
        person: 'Super'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Rajesh',
        person: 'Super'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Weather App',
        message: 'Getting the help message',
        person: 'Super'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode.geocode(address, (error, {latitude, longitude} = {}) => {
         
      if(error){
            return res.send({forecastError: 'There was a forecast error. Try again'});
        }else{        
            forecast.weatherForecast(latitude, longitude, (data, error) => {                
                res.send(data);
            });
        }
    
    });
    
});

//default view for unmatched urls
//could also be of the form '/help/*
app.get('*', (req, res) => {
    
    res.render('404', {
        title: '404 Error',
        message: 'There has been an error in the url',
        person: 'Super'        
    });
});

app.listen(port, () => {
    
    console.log('Server up on port 3000');
});