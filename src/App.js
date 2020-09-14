import React, { useState, useEffect } from 'react';
import './App.css';

import api from './services/api';

import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Card from './components/Card/Card';
import InputGroup from './components/InputGroup/InputGroup';
import List from './components/List/List';
import ListItem from './components/ListItem/ListItem';
import Alert from './components/Alert/Alert';

function App() {

  const [tasks, setTasks] = useState([]);
  const [errorAlert, setErrorAlert] = useState();

  useEffect( () => {

    api.get('/tasks').then( response => {
      setTasks(response.data);
      console.log(response.data)
    });

  }, []);

  const handleAddTask = async () => {
    
    const inputTask = document.querySelector("#input-task");

    const response = await api.post('/tasks', { title: inputTask.value });
    
    if(response.data.errors){
      console.log('Erro: ', response.data.errors[0].message)
      setErrorAlert(<Alert className="alert-danger">{response.data.errors[0].message}</Alert>)
      return;
    }

    const newTask = response.data;
    setTasks([...tasks, newTask ]);
    setErrorAlert();
    inputTask.value = '';
  }


  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <Card>
          <InputGroup onClick={handleAddTask} />
          <List>
            {errorAlert}
            { (tasks.length === 0) ? 
              <Alert className="alert-primary">Ainda não há tarefas cadastradas!</Alert> :
              tasks.map( task => <ListItem title={task.title} />) 
            }
          </List>
        </Card>
      </Container>
    </>
  );
}

export default App;
