//Declare all my requirements. On one line, kinda, because I'm stylish like that.
const   express = require("express"),
        methodOverride = require("method-override"),
        bodyParser = require("body-parser"),
        exphbs = require('express-handlebars'),
        mongoose = require('mongoose'),
        cheerio = require('cheerio'),
        request = require('request'),
        app = express();


// Set a route to serve static files (HTML, CSS, images, etc)
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))

//Allow Mongoose to use ES6 Promises.
mongoose.Promise = Promise;
//If running on Heroku, connect using that config variable.
if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI,
    {
        useMongoClient: true
    },
    function(){
        //Callback function to make sure that things are working in Prod.
        console.log("Connected in Production Environment");
    });
}
//If running locally, connect using that same URL so I just have to care about one DB, but hidden in a config file that's included in my .gitignore file.
//No using my Database for nefarious purposes. :-p    
else {
    const devURI = require("./config/dev.js");
    mongoose.connect(devURI,
    {
        useMongoClient: true
    },
    function(){
        //Callback function to make sure that things are working in Dev.
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
