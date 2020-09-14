import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Card from './components/Card/Card';
import InputGroup from './components/InputGroup/InputGroup';
import List from './components/List/List';
import ListItem from './components/ListItem/ListItem';

function App() {
  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <Card>
          <InputGroup />
          <List>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </List>
        </Card>
      </Container>
    </>
  );
}

export default App;
