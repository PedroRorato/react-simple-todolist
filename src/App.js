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

    api.get('/tasks').then( response => {
      setTasks(response.data);
      console.log(response.data)
    });

  }, []);

  const handleAddTask = async () => {
    
    const title = document.querySelector("#input-task").value;

    const response = await api.post('/tasks', { title });
    
    if(response.data.errors){
      console.log('Erro: ', response.data.errors[0].message)
      return;
    }

    const newTask = response.data;

    setTasks([...tasks, newTask ])
  }

  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <Card>
          <InputGroup onClick={handleAddTask} />
          <List>
            { tasks.map( task => <ListItem title={task.title} />) }
          </List>
        </Card>
      </Container>
    </>
  );
}

export default App;
