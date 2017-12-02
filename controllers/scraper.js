const cheerio = require("cheerio");
const request = require("request");

function scraper(callbackFunction){// Make a request call to grab the HTML body from the site of your choice
request("http://nytimes.com", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  const results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $(".story-heading").each(function(i, element) {
    const article = {}
    const link = $(element).children().attr("href");
    const title = $(element).text().trim();
    request(link, function(error, response, html) {

        return FOO
    }
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  callbackFunction(results);
});
};

scraper(console.log)
module.exports = scraper;