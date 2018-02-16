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
    this.loadRepos();
  }

  loadRepos() {
    $.get('/repos', {
      dataType: 'application/json',
    }, this.handleRepoData);
  }

  handleRepoData(data) {
    var repoArray = JSON.parse(data);
    this.setState({
      repos: repoArray
    });
  }

  search (term) {
    $.post({
      url: '/repos',
      data: JSON.stringify({user: term}),
      contentType: 'application/json',
      dataType: 'application/json',
    });
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