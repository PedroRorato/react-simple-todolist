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
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

function App() {

  const [tasks, setTasks] = useState([]);
  const [errorAlert, setErrorAlert] = useState('');
  const [modalDeleteStatus, setModalDeleteStatus] = useState('show');
  const [modalDeleteItem, setModalDeleteItem] = useState({id: 0, title: ''});
  const [modalUpdateItem, setModalUpdateItem] = useState({id: 0, title: ''});

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
      setErrorAlert(<Alert className="alert-danger">{response.data.errors[0].message}</Alert>);
      return;
    }

    const newTask = response.data;
    setTasks([...tasks, newTask ]);
    setErrorAlert('');
    inputTask.value = '';
  }

  const handleDeleteTask = async (id) => {
    
    await api.delete(`/tasks/${id}`);

    setTasks([...tasks.filter(task => task.id !== id)]);
    setModalDeleteStatus('');
  }

  const showDeleteModal = (id) => {

    const task = tasks.find(element => element.id == id);

    setModalDeleteItem(task);

    setModalDeleteStatus('show');
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
              tasks.map( task => (
                <ListItem 
                  key={task.id}
                  id={task.id}
                  title={task.title} 
                  onClickDelete={() => showDeleteModal(task.id)} 

                />
              )) 
            }
          </List>
        </Card>
      </Container>
      <Modal status={modalDeleteStatus} title="Delete Task" closeModal={() => setModalDeleteStatus('')}>
        <div className="modal-body">
          <h3>Tem certeza que deseja excluir a tarefa <strong>"{modalDeleteItem.title}"</strong>?</h3>
        </div>
        <div className="modal-footer">
          <Button onClick={() => setModalDeleteStatus('')} className="secondary btn-lg px">CLOSE</Button>
          <Button onClick={() => handleDeleteTask(modalDeleteItem.id)} className="danger btn-lg px">DELETE</Button>
        </div>
      </Modal>
    </>
  );
}

export default App;