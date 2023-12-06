const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewPaths = (path.join(__dirname, '../templates/views'))
const partialPaths = (path.join(__dirname, '../templates/partials'))

app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialPaths)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Creathed by HB'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Creathed by HB'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This Page is for your Help',
        title: 'Weather App',
        name: 'Created by HB'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'To get weather information please enter the address'
        })
    }

    geocode(req.query.address,(error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        console.log('Error', error)
        console.log('Data', data)
        forecast(data.latitude, data.longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            console.log('Error', error)
            console.log('Data', data)
            res.send({
                Data: data
            })
        })
        
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'To get product you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Created by HB',
        errorMessage: 'Help article not found !'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Created by HB',
        errorMessage: 'Page not found !'
    })
})

app.listen(port, () => {
    console.log('Server is run on port ' + port)
})