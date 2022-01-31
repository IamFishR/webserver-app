const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// console.log(path.join(__dirname, '../public'));
console.log(__dirname);
// console.log(__filename);

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Home',
        'name': 'Rakesh'
    })
})

app.get("/about", (req, res) => {
    res.render('about',{
        'title': 'About',
        'name': 'Rakesh'
    })
})

app.get("/help", (req, res) => {
    res.render('help',{
        'title': 'Help',
        'name': 'Rakesh'
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        'title': 'help not found',
        'message': 'article not found'
    })
})

// app.com -> 
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address is mandatory'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, {rain_prob, temp, place_name, unit, resp}) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                rain_prob: rain_prob,
                temp: temp,
                place_name: place_name,
                unit: unit,
                resp: resp
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': 'Page Not Found',
        'message': 'Request page not found',
        'name': 'Rakesh'
    })
})


// start the server
app.listen(3000, () => {
    console.log('server is up on port 3000')
})