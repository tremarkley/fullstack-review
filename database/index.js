const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type:  Number, unique: true,},
  name: String,
  owner: String,
  url: String,
  description: String,
  stars: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayRepos, callback) => {
  for (let i = 0; i < arrayRepos.length; i++) {
    var repoDoc = arrayRepos[i];
    repoDoc.owner = repoDoc.owner.login;
    repoDoc.url = repoDoc.html_url;
    repoDoc.stars = repoDoc.stargazers_count;

    var query = { 'id': repoDoc.id };
    var errors = [];

    Repo.findOneAndUpdate(query, repoDoc, { upsert: true }, (err, doc) => {
      if (err) {
        errors.push(error);
      }
    });
  }
  if (errors.length > 0) {
    callback(errors);
  } else {
    callback(null);
  }
}

//gets top 25 repos sorted by number of stars
let getRepos = (callback) => {
  Repo.find().limit(25).sort({stars: -1}).exec((err, repos) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, repos);
    }
  });
}

module.exports.save = save;
module.exports.getRepos = getRepos;