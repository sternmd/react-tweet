import React, { Component } from 'react';
import './App.css';
import { Container, Section, Columns, Column } from 'bloomer';
import TwitterList from './components/TwitterList';
import TwitterHeader from './components/TwitterHeader';

class App extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Columns>
            <Column isSize='1/2'>
              <TwitterHeader />
              <TwitterList />
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export default App;
