var request = require('request');
var util = require('util');
var twit = require('twit');
var config = require('./config.js');
var twitter = new twit(config);
var newsUrl = "https://newsapi.org/v1/articles?source=%s&apiKey=eb68888949c94e84872feecdf4cd708c";
var newsSources = ["cnn", "cnbc", "bbc-news", "buzzfeed", "google-news", "the-hindu", "new-york-magazine", "sky-news", "the-wall-street-journal", "buzzfeed"];
var find = [" from ", " with ", " where ", " will ", " your ", " what ", " says ", " that "];
var async = require('async');
var listOfTitles = [];
var urls = [];
var fog = require('./splitCountSort');
async.map(newsSources, getinfo, handleResults);
function handleResults(err, title) {
    if (!err) {
        title = title[0].toString();
        var z = fog.replaceStr(title, find);
        var x = fog.createWordMap(z);
        var y = fog.sortByCount(x);
        console.log(y);

        newsSources.forEach(function (item1) {
            request(util.format(newsUrl, item1),
                function (error, response, body) {
                    var newsObj = JSON.parse(body);

                    newsObj.articles.forEach(function (article) {
                        article.title = article.title.toLocaleLowerCase();
                        //   console.log(y);
                        if (article.title.indexOf(y) > 0) {

                            urls.push(article.url);
                            for (i = 0; i <= urls.length; i++) {
                                twitter.post('statuses/update', { status: "This is the popular word in today's articles" + " " + y + " " + urls[i] }, function (err, data, response) {
                                    if (err)
                                        console.log("couldnot post tweet in twitter")
                                    console.log(data)
                                });

                            }
                        }
                    })

                });
        })


    } else {
        console.log('Error: ' + err);
    }
    //  return title;
}
//async calling method
function getinfo(item, callback) {
    request(util.format(newsUrl, item), function (error, response, body) {
        var newsObj = JSON.parse(body);
        //     console.log(newsObj.source)  //print article source
        newsObj.articles.forEach(function (article) {
            listOfTitles.push(article.title);
            //  console.log(listOfTitles);
        })

        callback(null, listOfTitles);
    });
}


