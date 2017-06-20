//No promises
// var path = require('path');
// var fs = require('fs');
// var express = require('express');
// var bodyParser = require('body-parser');

// //find the client/frontend folder
// var clientPath = path.join(__dirname, '../client');
// var dataPath = path.join(__dirname, 'data.json');

// var app = express();
// //serve files from the client/frontend folder
// app.use(express.static(clientPath));
// app.use(bodyParser.json());

// app.route('/api/chirps')
//     .get(function(req, res) {
//         res.sendFile(dataPath);
//     }).post(function(req, res) {
//         var newChirp = req.body;
//         fs.readFile(dataPath, 'utf8', function(err, fileContents) {
//             if (err) {
//                 console.log(err);
//                 res.sendStatus(500);
//             } else {
//                 var chirps = JSON.parse(fileContents);
//                 chirps.push(newChirp);
//                 fs.writeFile(dataPath, JSON.stringify(chirps), function(err) {
//                     if (err) {
//                         console.log(err);
//                         res.sendStatus(500);
//                     } else {
//                         res.sendStatus(201);
//                     }
//                 });
//             }
//         });
//     });

// app.listen(3000);



//In Class Solution With Promises
var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

//find the client/frontend folder
var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');

var app = express();
//serve files from the client/frontend folder
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.route('/api/chirps')
    .get(function(req, res) {
        res.sendFile(dataPath);
    }).post(function(req, res) {
        var newChirp = req.body;
        accessFile(dataPath, 'utf8')
        .then(function(fileContents) {
            var chirps = JSON.parse(fileContents);
            chirps.push(newChirp);
            return writeFile(dataPath, JSON.stringify(chirps));
        }).then(function() {
            res.sendStatus(201);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

app.listen(3000);

//where can I find the file, and what is its encoding
function accessFile(filePath, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, encoding, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(filePath, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filePath, data, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}