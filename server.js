const   express = require("express"),
        methodOverride = require("method-override"),
        bodyParser = require("body-parser"),
        exphbs = require('express-handlebars'),
        mongoose = require('mongoose'),
        cheerio = require('cheerio'),
        request = require('request')

var app = express();
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))


mongoose.Promise = Promise;
if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI,
    {
        useMongoClient: true
    },
    function(){
        console.log("Connected in Production Environment");
    });
} else {
    const devURI = require("./config/dev.js");
    mongoose.connect(devURI,
    {
        useMongoClient: true
    },
    function(){
        console.log("Connected in Development environment");
    });
}
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
var routes = require('./controllers/controller.js');
app.use('/', routes);

console.log("App listening on port 3001")
var PORT = 3001;
app.listen(process.env.PORT || 3001);
