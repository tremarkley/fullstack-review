import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.handleRepoData = this.handleRepoData.bind(this);
    this.loadRepos = this.loadRepos.bind(this);
    this.loadRepos();//move this to a react lifecycle method
  }

  loadRepos() {
    $.get('/repos', {
      dataType: 'application/json',
    }, this.handleRepoData);
  }

  handleRepoData(data) {
    debugger
    var repoArray = JSON.parse(data);
    this.setState({
      repos: repoArray
    });
  }

  search (term) {
    //refactor this to not pass an ajax call into the cb
    //this might change the way you handle the post request on the server (hint: redirect?)
    //$.post('/repos', { user: term }, this.loadRepos);
    $.post('/repos', { user: term }, this.handleRepoData);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));