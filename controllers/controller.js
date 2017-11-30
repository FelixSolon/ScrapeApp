//Pull all requirements
var express = require('express');
var router = express.Router();
var path = require('path');

//Web page entry
router.get('/', function(req,res){
    res.redirect('/home');
});

//Serves the home page
router.get('/home', function(req,res){
    res.render("index", {});
});

router.get('/saved', function(req,res){
    res.render("saved", {})
});

router.get('/scrape', function(req,res){
    res.send("You scraped!")
});

module.exports = router;
