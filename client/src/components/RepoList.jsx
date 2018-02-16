import React from 'react';

const RepoList = (props) => {
  var reposDiv = []; 
 for (var i = 0; i < props.repos.length; i++) {
  var repo = <tr>
    <td><a href={props.repos[i].url}>{props.repos[i].name}</a></td>
    <td>{props.repos[i].owner}</td>
    <td>{props.repos[i].description}</td>
    <td>{props.repos[i].stars}</td>
  </tr>
  reposDiv.push(repo);
 } 
  return (
    <div>
      <h4> Repo Table </h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {reposDiv}
        </tbody>
      </table>
    </div>
)}

export default RepoList;