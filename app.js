var express = require('express')
var indexRoutes = require('./routes/index')
var usersRoutes = require('./routes/users')
var catalogRoutes = require('./routes/catalog')
var path = require('path')

var mongoose = require('mongoose')


//make database connectivity
const url = "mongodb+srv://m-001-student:m001-mongodb@sandbox.zoqk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection Error"))


var app = express()

app.use(express.json())
app.use(express.urlencoded(
   { extended:false}
))

var port = ( process.env.PORT || 1001 )

//set view engine
app.set("views",path.join(__dirname,'views'))
app.set("view engine","pug")

app.use('/', indexRoutes);
//app.use('/users', usersRoutes);
app.use('/catalog', catalogRoutes);


app.listen(port,(req,res)=>{
    console.log("server working at " + port)
})

app.use(express.static(path.join(__dirname, "public")));

module.exports = app