'use strict';

const http = require("http")
const fs = require("fs")
const url = require('url')
//const unzip = require('unzipper')
const path = require('path');

const server = http.createServer((request, response) => {
    console.log(request.method)
    switch (request.method) {
        case "GET":
            var file_url = '.' + request.url;
            if (request.url == '/') {
                file_url = './package.json';
            }
            if (fs.existsSync(file_url)) {
                var rs = fs.createReadStream(file_url);
                rs.pipe(response);
                rs.on('end', () => {
                    response.end();
                });
            }
            else {
                response.statusCode = 404;
                response.end();
            }
            break;
        case "PUT":
            var id = '';
            var info;
            request
//                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    const fileName = entry.path;

                    id = request.headers["song-id"]
                    const type = entry.type; // 'Directory' or 'File'
                    const size = entry.vars.uncompressedSize; // There is also compressedSize;
                    console.log(path.extname(fileName));
                    switch (path.extname(fileName)) {
                        case '.json':
                            entry.on('data', (chunk) => {
                                info = JSON.parse(chunk.toString());
                            })
                            break;
                        case '.ogg':
                            entry.pipe(fs.createWriteStream('./' + id + '.ogg'));
                            break;
                        default:
                            entry.autodrain();
                            break;
                    }
                }).on('close', () => {
                    song.add(id, info.title, info.composer, info.comment)
                });
            response.end();
            break;
    }
})
server.listen(989, '127.0.0.1', () => { console.log("server bound") });