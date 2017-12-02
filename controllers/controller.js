//Pull all requirements
const   express = require('express'),
        router = express.Router(),
        path = require('path'),
        cheerio = require('cheerio'),
        request = require('request'),
        scraper = require('./scraper.js')

if(scraper){
    console.log("Scraper Loaded")
}

//Web page entry
router.get('/', function(req,res){
    scraper(console.log())
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
