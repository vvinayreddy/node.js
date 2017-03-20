function stringCount(sentence, separator) {
    if (!separator || !sentence) {
        return false;
    }
    else {
        var words = sentence.split(separator),
            count = {};
        for (var i = 0, len = words.length; i < len; i++) {
            if (count.hasOwnProperty(words[i])) {
                count[words[i]] = parseInt(count[words[i]], 10) + 1;
            }
            else {
                count[words[i]] = 1;
            }
        }
        return count;
    }
}
function replaceStr(str, find) {
    for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), ' ');
    }
    return str;
}
module.exports.replaceResults = replaceStr;
module.exports.splitResult = stringCount;