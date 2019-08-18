import React, { Component } from 'react';
import './App.css';
import { Container, Section, Columns, Column, Title, Subtitle } from 'bloomer';
import TwitterList from './components/TwitterList';
import TwitterCard from './components/TwitterCard';

class App extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Columns>
            <Column isSize='1/2'>
              <Title>Twitter Stream</Title>
              <Subtitle>Search tweets in real-time!</Subtitle>

              <TwitterList />
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export default App;
