
const express = require('express')
const https =require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
   res.sendFile(__dirname + "/index.html")
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.css")
 })
app.post('/',(req,res)=>{
    const query = req.body.cityName
const apiKey= '175add3f1810cea5b864016fccce9b5a'
const unit ='metric'
const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID='+ apiKey +'&units='+ unit;

https.get(url,(response)=>{
console.log(response.statusCode);
response.on('data',(data)=>{
    const weatherData =JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDesc = weatherData.weather[0].description
    const icon =  weatherData.weather[0].icon
    const imageURL= 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    res.write('<p>The Weather is ' + weatherDesc + '<p>')
    res.write('<h1>Temperature in ' + query + ' is ' + temp + ' Degree Celcius </h1>')//we can write 'n' number of res.write in application
    res.write( '<img src=' + imageURL + '>')
    // res.write('<footer>Vikram Kumar </footer>')
    res.send()//we can write only one res.send in entire application
})
})
})
app.post('/',(req,res)=>{
    console.log('Post Request');
})

app.listen(2121,()=>{
    console.log("Server Running on 2121");
})