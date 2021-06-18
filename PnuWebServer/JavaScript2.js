const express = require('express');
const app = express();
const wordlist = require('./wordlist');
wordlist.load();
wordlist.add("test", {"apple":"사과"});
console.log({"apple": "사과"});
console.log(wordlist.data);

app.get('/list', (req, res) => { // 단어장 목록 저장
    console.log(req.url);
    res.json(users);
});
app.get('/list/:something/', (req, res) => { // 단어장 목록 저장
    id = req.url.substr(6);
//    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

//    console.log();
    res.json(wordlist.get(id));
});
app.post('/post', (req, res) => {
    console.log('who get in here post /users');
    var inputData;

    req.on('data', (data) => {
        inputData = JSON.parse(data);
    });

    req.on('end', () => {
        console.log("user_id : " + inputData.user_id + " , name : " + inputData.words);
    });
    res.write("OK");
    res.end();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
