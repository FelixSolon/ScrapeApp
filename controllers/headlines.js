// Controller for our headlines
// ============================

//Require the Scrape script so we can do literally anything.
const scrape = require("../scripts/scrape");
//Require the function to attach a date to the schema
const makeDate = require("../scripts/date");
//Import the actual schema
const Headline = require("../models/Headline");
//Export an object
module.exports = {
  //Fetch method
  fetch: function(cb) {
    //run the scrape function with an anonymous function
    scrape(function(articles) {
      //for-loop through everything
      for (var i = 0; i < articles.length; i++) {
        //Attach the date to the article
        articles[i].date = makeDate();
        //I've seen people do "articles[i].saved=false" here.
        //It's false by default in the schema, so I'm not sure why that'd be necessary.
      }
      //Insert Many because otherwise you insert exactly one article at a time, and only the first one it finds.
      //ordered:false lets Mongo insert things in the most efficient fashion. We can sort it when we pull it out.
      //It also keeps processing insertions after it errors (like, for instance, it's trying to insert a duplicate of a unique field like headline)
      //So every time we scrape and reinsert a ton of stuff, Mongo will throw a zillion errors but then proceed regardless.
      Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
        cb(err, docs);
      });
    });
  },
  //Delete method
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  //Get method, sorting by id descending.
  get: function(query, cb) {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  //Update method.
  update: function(query, cb) {
    Headline.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
};
