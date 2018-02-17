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

    Repo.findOneAndUpdate(query, repoDoc, { upsert:true }, function(err, doc){
      if (err) { callback(error) };
      //return res.send("succesfully saved");
    });
    // new Repo(repoDoc).save((err, repo) => {
    //   callback(err);
    // });
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