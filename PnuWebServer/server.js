const express = require('express');
const app = express();
const wordlist = require('./wordlist');
wordlist.load();
console.log(wordlist.data);

app.get('/list', (req, res) => { // 단어장 목록 저장
    console.log(req.url);
    res.json(users);
});
app.get('/list/:something/', (req, res) => { // 단어장 목록 저장
    id = req.url.substr(6);
//    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    res.json(wordlist.get(id));
});
app.post('/list/:something/', (req, res) => {
    id = req.url.substr(6);

    req.on('data', (data) => {
        console.log("data:" +data);
        var input = JSON.parse(data);
        wordlist.set(id, input);
    });

    req.on('end', () => {
        console.log("id : " + req.params['id']);
    });
    console.log(wordlist.data);
    res.write("OK");
    res.end();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
