const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/fetcher');
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

let save = (arrayRepos) => {
  for (let i = 0; i < arrayRepos.length; i++) {
    //rename fullRepo to be more transparent that it'll be a document and use es6 Object Shorthand Notation to clean up line 21
    var fullRepo = arrayRepos[i];
    var owner = fullRepo.owner.login;
    var newRepo = new Repo({id: fullRepo.id, name: fullRepo.name, owner: owner, url: fullRepo.html_url, description: fullRepo.description, stars: fullRepo.stargazers_count});
    newRepo.save();
  }
}

//gets top 25 repos sorted by number of stars
let getRepos = (callback) => {
  Repo.find().limit(25).sort({stars: -1}).exec((err, repos) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, repos);
    }
  });
}

module.exports.save = save;
module.exports.getRepos = getRepos;