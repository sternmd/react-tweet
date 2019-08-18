import React from 'react';
import socketIOClient from 'socket.io-client';
import TwitterCard from './TwitterCard';
import { Field, Label, Input, Control } from 'bloomer';

class TwitterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
    console.log(this.state.searchTerm);
  }

  componentDidMount() {
    const socket = socketIOClient('http://locahost:3000/');

    socket.on('connect', () => {
      console.log(`socket connected`);
      socket.on('data', data => {
        console.log(data);
      });
    });

    socket.on('disconnect', () => {
      socket.off('data');
      socket.removeAllListeners('data');
      console.log('socket disconnected');
    });
  }

  render() {
    let tweets = this.state.tweets;

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
        <TwitterCard />
      </div>
    );
  }
}

export default TwitterList;
