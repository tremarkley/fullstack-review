const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const bodyparser = require('body-parser');
const db = require('../database/index.js');

// app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.user;
  github.getReposByUsername(username, (error, response, body) =>{
    if (!error && response.statusCode === 200) {
      var repos = JSON.parse(body);
      db.save(repos);
      res.statusCode = 201;
      res.end('Success');
    } 
  });
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.getRepos((repos) => {
    res.send(200, JSON.stringify(repos));
  })
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

