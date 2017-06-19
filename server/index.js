var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');

var fileServer = express.static(clientPath);
app.use(fileServer);

app.get('/', function(req, res) {
    res.send('');
});

app.get('/api/chirps', function(req, res) {
    res.send('');
});

app.post('/api/chirps', function(req, res) {
    fs.readFile(dataPath, 'utf8', function(err, fileContents) {
        if (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            var chirps = JSON.parse(fileContents);

            var incomingData = '';
            req.on('data', function(chunk) {
                incomingData += chunk;
            });
            req.on('end', function() {
                var newChirp = JSON.parse(incomingData);
                chirps.push(newChirp);

                var chirpsJSONData = JSON.stringify(chirps);
                fs.writeFile(dataPath, chirpsJSONData, function(err) {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(201);
                        res.end();
                    }
                });
            });
        }
    });
});

app.listen(3000);