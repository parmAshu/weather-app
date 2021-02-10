const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk')

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;

// getting the keys from the files
const keys = JSON.parse(fs.readFileSync('src/utils/keys.json').toString())

geocode.setKey( keys.mapbox );
forecast.setKey( keys.weatherstack);

// express app object
const app = express()

// setting the view engine for express server
app.set('view engine', 'hbs');
// setting the path to directory where the view templates are stored
app.set('views', viewsDirectoryPath);
// setting the path to directory where partials are stored
hbs.registerPartials(partialsDirectoryPath);
// setting the path to directory containing static assets
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'weather',
        name : 'Ashutosh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'For accessing the source code visit - https://github.com/parmAshu/weather-app.git',
        title : 'help',
        name : 'Ashutosh'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'about me',
        name : 'Ashutosh'
    })
})

app.get('/weather', (req, res) => {
   if( req.query.address ){
       //console.log(req.query);
        geocode.geocode( req.query.address , (error, location)=>{
            if(error){
                //console.log( chalk.red(error) );
                res.send( {
                    error : error
                })
            }
            else{
                //console.log(location);
                forecast.forecast( location, (_error, response) => {
                    if( _error ){
                        //console.log( chalk.red(_error) );
                        res.send( {
                            error : _error
                        })
                    }
                    else{
                        //console.log(response);
                         res.send( {
                             weather : response,
                             place : location.place,
                             address : req.query.address
                         })
                    }
                })
            }
        })
   }
   else{
       res.send({
           error : 'address not specified'
       })
   }
})

app.get('/products', (req, res)=>{
    if( !req.query.search ){
        res.send({
            error : 'search query not provided'
        })
    }
    else{
        res.send({
            products : []
        })
    }
})

app.get( '*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ashutosh',
        errorMessage : 'Resource Not Founds'
    })
})

app.listen( port, ()=> {
    //console.log('Server is up on port 3000');
})