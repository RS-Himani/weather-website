const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewPaths = (path.join(__dirname, '../templates/views'))
const partialPaths = (path.join(__dirname, '../templates/partials'))
//console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialPaths)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Created for challenge'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'From the Dynamic Page for About',
        name: 'Creathed for challenge'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This Page is for your Help',
        title: 'From the Dynamic Page for Help',
        name: 'Creathed for challenge'
    })
})

app.get('/weather', (req, res) => {
    res.send(
    {
        forecast: 'It is cloudy',
        location: 'Vadodara'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Creathed for challenge',
        errorMessage: 'Help article not found !'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Creathed for challenge',
        errorMessage: 'Page not found !'
    })
})
app.listen(3001, () => {
    console.log('Challenge Server is running on 3001 !')
})