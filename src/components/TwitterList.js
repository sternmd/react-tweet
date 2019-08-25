import React from 'react';
import socketIOClient from 'socket.io-client';
import TwitterCard from './TwitterCard';
import { Field, Input, Control, Progress, Tag } from 'bloomer';
import _ from 'lodash'; // debounce

const socket = socketIOClient('http://localhost:3000/');

class TwitterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: '$MSFT'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async e => {
    this.setState({ results: [] });
    await this.setState({ searchTerm: e.target.value });
    await this.handleSearch();
  };

  handleSearch = _.debounce(e => {
    socket.emit('searchTerm', this.state.searchTerm);
    console.log(`emitting new search for: ${this.state.searchTerm}`);
  }, 1000);

  componentDidMount() {
    socket.on('connect', () => {
      console.log(
        `Socket connected, incoming new tweets for: ${this.state.searchTerm}`
      );
      socket.on('tweets', data => {
        let list = [data].concat(this.state.results.slice(0, 15));
        this.setState({ results: list });
      });
    });
    socket.on('Socket disconnected', () => {
      socket.removeAllListeners('tweets');
      console.log('Socket Disconnected');
    });
  }

  render() {
    const { results } = this.state;

    let loading = <Progress isColor='info' max={100} />;
    let counter = (
      <Tag isPulled='right' isColor='info'>
        <p>
          <span className='blinking'>{results.length}</span> live tweets
        </p>
      </Tag>
    );
    return (
      <div>
        {counter}
        <Field>
          <Control>
            <Input
              isSize='large'
              type='text'
              placeholder='Search for...'
              onChange={this.handleChange}
              value={this.state.searchTerm}
            />
          </Control>
        </Field>

        {results.length > 0
          ? results.map((item, i) => <TwitterCard data={item} key={i} />)
          : loading}
      </div>
    );
  }
}

export default TwitterList;
