//Require our NPM packages
const   express = require("express"),
        mongoose = require("mongoose"),
        expressHandlebars = require("express-handlebars"),
        bodyParser = require("body-parser"),

        //Set a port variable to either what Heroku uses, or 3000 if we're working on localhost.
        PORT = process.env.PORT || 3000,
        //for convenience/convention
        app = express(),
        router = express.Router();

if (process.env.MONGODB_URI){
    console.log("Working in Production!")
} else {
    //I want to work with my database off Heroku, so I can make sure things are working properly
    //But I don't really want to expose the URI as it has the authentication in the string.
    //Hence this.
    const MongoURI = require("./mongoURI.js")
}

//Actually start routing things
require("./config/routes")(router);

//Actually make it possible to render CSS/Images/Regular HTML/etc.
app.use(express.static(__dirname + "/public"));

//Use Handlebars. Because we need to use handlebars, probably because the Bootcamp hates us.
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Use BodyParser, because middleware and req.body is a nice thing.
app.use(bodyParser.urlencoded({
  extended: false
}));

//Tell Express how to route things.
app.use(router);

//Tell Mongo to start talking to the server.
const db = process.env.MONGODB_URI || MongoURI;
mongoose.connect(db, function(error) {
    //log errors if things go wrong.
  if (error) {
    console.log(error);
  }
  else {
    //Give feedback that things are working.
    console.log("mongoose connection is successful");
  }
});

//Let the user know that the server is running.
//Not that I've EVER tried to troubleshoot before realizing things are fine and I forgot a console.log to let me know that.
// >_>
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
