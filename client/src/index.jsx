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
  }

  componentDidMount() {
    if (this.state.repos.length === 0) {
      this.loadRepos();
    }
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