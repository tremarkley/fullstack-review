const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type:  Number, unique: true,},
  name: String,
  owner: String,
  url: String,
  description: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayRepos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (let i = 0; i < arrayRepos.length; i++) {
    var fullRepo = arrayRepos[i];
    var owner = fullRepo.owner.login;
    var newRepo = new Repo({id: fullRepo.id, name: fullRepo.name, owner: owner, url: fullRepo.html_url, description: fullRepo.description, forks: fullRepo.forks});
    newRepo.save();
  }
}

let getRepos = (callback) => {
  Repo.find((err, repos) => {
    callback(repos);
  });
}

module.exports.save = save;
module.exports.getRepos = getRepos;