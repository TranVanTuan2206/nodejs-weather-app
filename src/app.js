const path = require('path')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const app = express();
const hbs = require('hbs')

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'weather',
        name: 'Tuan'
    })
})

app.get('/about', (req, res) => {
   res.render('about',{
    title: 'ABOUT',
    name: 'Tuan Tran'
}) 
})

app.get('/help', (req, res) => {
   res.render('help',{
    title: 'HELP',
    name: 'Cristiano Ronaldo'
}) 
})


app.get('/weather',(req,res) => {
    let address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (err, data) => {
        if (err) {
           return res.send({err})
        } 
        const location = data.location
        forecast(data.latitude,data.longitude,(err,forecastdata) => {
            if( err) {
                console.log(err);
            }
            res.send({
                forecastData: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
   

})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({error: 'you must provide a search term'})
    }
    console.log(req.query);
    res.send({products: []})
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'helper',
        errMess: 'Help 404'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Tuan',
        errMess: '404 Not found'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})