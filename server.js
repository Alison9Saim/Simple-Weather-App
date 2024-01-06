const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '3b427ca20ef94b81ad512156240601';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  console.log("city = "+ city);
  //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let url =  `http://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${city}&aqi=no`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again1'});
    } else {
      let weather = JSON.parse(body)
      console.log('+++++++++++++++++++++++++++++++')
      console.log(weather.location.name);
      if(weather == undefined){
        res.render('index', {weather: null, error: 'Error, please try again2'});
      } else {
        let weatherText = `It's ${weather.current.temp_c} degrees in ${weather.location.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})