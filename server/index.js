const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const bodyparser = require('body-parser');
const db = require('../database/index.js');

// app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res, next) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.user;
  github.getReposByUsername(username, (error, response, body) =>{
    //be verbose about errors, show them to the user
    if (!error && response.statusCode === 200) {
      var repos = JSON.parse(body);
      db.save(repos, (err) => {
        console.log('FINISHED SAVING REPOS');
        if (!err) {
          next();
        } else {
          //error saving to database
          res.statusCode = 500;
          res.end(`Error saving to database: ${err}`)
        }
      });
    }
    //error calling to github api
    if (error) {
      res.statusCode = response.statusCode;
      res.end(`Error posting: ${error}`)
    }
  });
}, function(req, res, next) {
  db.getRepos((error, repos) => {
    if (error === null || repos.length > 0) {
      res.send(201, JSON.stringify(repos));
    } else {
      res.send(500, JSON.stringify({Error: "Post successful, but error getting repos from db: " + error }));
    }
  })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.getRepos((error, repos) => {
    if (!error) {
      res.send(200, JSON.stringify(repos));
    } else {
      res.send(500, JSON.stringify(error));
    }
  })
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

