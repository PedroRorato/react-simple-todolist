import React, { useState, useEffect } from 'react';
import './App.css';

import api from './services/api';

import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Card from './components/Card/Card';
import InputGroup from './components/InputGroup/InputGroup';
import List from './components/List/List';
import ListItem from './components/ListItem/ListItem';

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect( () => {

    api.get('/task').then( response => {
      setTasks(response.data);
    });

  }, [])

  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <Card>
          <InputGroup />
          <List>
            { tasks.map( task => <ListItem title={task.title} />)}
          </List>
        </Card>
      </Container>
    </>
  );
}

export default App;
