//Require Request and Cheerio so we can pull down other websites and do things to them.
const request = require("request");
const cheerio = require("cheerio");

//Throw the whole thing in a variable for export
const scrape = function(cb) {
  //Request the New York Times website's HTML
  request("http://www.nytimes.com", function(err, res, body) {
    //Use Cheerio to interact with the reponse from Request. Put it in the constant $ to make it work like jQuery.
    const $ = cheerio.load(body);
    //Declare an array to add things to.
    const articles = [];
    //Grab the class on the NYT website that generally designats an article
    $(".theme-summary").each(function(i, element) {
      //Set the headline to the text of the element that links to the story.
      const headline = $(this).children(".story-heading").text().trim();
      //Find the anchor element that's the child of the .story-heading element and set its link to the URL
      const url = $(this).children(".story-heading").children("a").attr("href");
      //Find the element with the summary class under the headline element and throw its text into the "summary" variable
      const summary = $(this).children(".summary").text().trim();
      //If and only if it was able to find all of the above...
      if (head && sum && url) {
        //...throw them into an object.
        const dataToAdd = {
          headline: headline,
          summary: summary,
          url: url
        };
        //Push that object to the array.
        articles.push(dataToAdd);
      }
    });
    //Allow us to feed in a callback function to run on the articles array.
    cb(articles);
  });
};
module.exports = scrape;
