import React from 'react';
import socketIOClient from 'socket.io-client';
import TwitterCard from './TwitterCard';
import { Field, Input, Control } from 'bloomer';

class TwitterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSearch() {
    let term = this.state.searchTerm;
    fetch('/setSearchTerm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ term })
    });
  }

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000/');

    socket.on('connect', () => {
      console.log('Socket Connected');
      socket.on('tweets', data => {
        let list = [data].concat(this.state.results.slice(0, 15));
        this.setState({ results: list });
      });
    });
    socket.on('disconnect', () => {
      socket.removeAllListeners('tweets');
      console.log('Socket Disconnected');
    });
  }

  render() {
    let results = this.state.results;

    return (
      <div>
        <Field>
          <Control>
            <Input
              isSize='large'
              type='text'
              placeholder='Search for...'
              onChange={this.handleChange}
            />
          </Control>
        </Field>

        {results.map((item, i) => (
          <TwitterCard data={item} key={i} />
        ))}
      </div>
    );
  }
}

export default TwitterList;
