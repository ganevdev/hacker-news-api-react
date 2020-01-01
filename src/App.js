import './App.css';

import React, { Component } from 'react';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      let result = await fetch(API + DEFAULT_QUERY);
      result = await result.json();
      this.setState({
        hits: result.hits,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  render() {
    const { hits, isLoading, error } = this.state;

    if (error) return <p>{error.message}</p>;
    if (isLoading) return <p>Loading...</p>;
    return (
      <ul>
        {hits.map(hit => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    );
  }
}
export default App;
