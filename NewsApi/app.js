
var request = require('request');
var util = require('util');
var strCount = require('./splitCountSort')
var temp = [];
var collection
var newsUrl = "https://newsapi.org/v1/articles?source=%s&apiKey=eb68888949c94e84872feecdf4cd708c"
var newsSources = ["cnn"]
var twit = require('twit');
var config = require('./config.js');
var twitter = new twit(config);
var wordcount = [];
var find = [" a ", " with ", " an ", " is ", " as ", " to ", " of ", " on ", " from ", " at ", " he ", " she ", " in "];
newsSources.forEach(function (item) {
    request(util.format(newsUrl, item),
        function (error, response, body) {
            //  console.log('error:', error); // Print the error if one occurred 
            //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            //console.log('body:', body); // Print the JSON for the news api. 

            var newsObj = JSON.parse(body);

            newsObj.articles.forEach(function (article) {

                var words = article.title.split(' ')

                temp.push(article.title);

            })

            collection = temp.toString();
            var replacedcollection = strCount.replaceResults(collection, find);
            var coll = replacedcollection.split(',').join(' ');

            var sortResult = strCount.splitResult(coll.toString(), ' ');

            var sortable = [];
            for (var valNumber in sortResult) {
                sortable.push([valNumber, sortResult[valNumber]]);
            }
            sortable.sort(function (a, b) {
                return a[1] - b[1];
            });
            var revSort = sortable.reverse();
            var twitvar = revSort[0];
            twitvar.splice(1, 1)
            console.log(twitvar);
            twitter.post('statuses/update', { status: "This is the popular word in today's articles" + " " + twitvar }, function (err, data, response) {
                if (err)
                    console.log("couldnot post tweet in twitter")
                console.log(data)
            });
        });



})




