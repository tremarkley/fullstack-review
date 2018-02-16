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

let save = ({id, name, owner, url, description, forks}) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var newRepo = new Repo({id: id, name: name, owner: owner, url: url, description: description, forks: forks});
  newRepo.save();
}

module.exports.save = save;