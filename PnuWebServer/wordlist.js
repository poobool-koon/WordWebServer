const fs = require('fs')

exports.data = {};
exports.save = function () {
    console.log("save:" + JSON.stringify(exports.data));
    fs.writeFile('list.json', JSON.stringify(exports.data), (err) => { if (err) console.log(err) });
}

exports.load = function () {
    var a;
    if (fs.existsSync('list.json')) {
        a = fs.readFileSync('list.json');
    } else {
        a = '{}'
    }
    exports.data = JSON.parse(a.toString());
    console.log(exports.data);
}
exports.set = function (id, wordlist) {
    exports.data[id] = Object.assign(exports.data[id] ,wordlist);
    exports.save();
    return true;
}
exports.get = function (id) {
    console.log(id, exports.data[id] )
    if (exports.data[id] == undefined) {
        return {};
    }
//    console.log(exports.data[id]);
    return exports.data[id];
}