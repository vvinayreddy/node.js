/////////////////// Sorting Words //////////////////////////////
function sortByCount(sortVar) {
    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(sortVar).map(function (key) {
        return {
            name: key,
            total: sortVar[key]
        };
    });
    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });
    return finalWordsArray[0].name //+ " " + "this word has repeated " + finalWordsArray[0].total;
}
/////////////////// Counting Words //////////////////////////////
function createWordMap(wordArray) {
    wordArray = wordArray.split(',').join(' ').toLocaleLowerCase();
    wordArray = wordArray.split(" ");
    var wordsMap = {};
    wordArray.forEach(function (key) {
        if (key.length > 3) {
            if (wordsMap.hasOwnProperty(key)) {
                wordsMap[key]++;
            } else {
                wordsMap[key] = 1;
            }
        }
    });
    return wordsMap;
    //  console.log(wordsMap);
}

function replaceStr(str, find) {
    for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), ' ');
    }
    return str;
}
module.exports.replaceStr = replaceStr;
module.exports.createWordMap = createWordMap;
module.exports.sortByCount = sortByCount;

