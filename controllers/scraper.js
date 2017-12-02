const cheerio = require("cheerio");
const request = require("request");
var scraper = function (callback){// Make a request call to grab the HTML body from the site of your choice
  const results = [];
  request("http://nytimes.com", function(error, response, html) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works  
    $(".theme-summary").each(function(i, element) {
      const title = $(this).children(".story-heading").text().trim();
      const link = $(this).children(".story-heading").children("a").attr("href");
      const summary = $(this).children("p.summary").text().trim()
      if(title&&link&&summary){
        results.push({
            title: title,
            link: link,
            summary: summary
        });
      };
    });
    callback(results);
  });
};
module.exports=scraper;