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
  const [modalDeleteStatus, setModalDeleteStatus] = useState('');
  const [modalUpdateStatus, setModalUpdateStatus] = useState('');
  const [modalDeleteItem, setModalDeleteItem] = useState({id: 0, title: ''});
  const [modalUpdateItem, setModalUpdateItem] = useState({id: 0, title: ''});

  useEffect( () => {

    api.get('/tasks').then( response => {
      setTasks(response.data);
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

  const handleDeleteTask = async () => {
    
    await api.delete(`/tasks/${modalDeleteItem.id}`);
    setTasks([...tasks.filter(task => task.id !== modalDeleteItem.id)]);
    setModalDeleteStatus('');
  }

  const handleUpdateTask = async () => {

    const form = document.querySelector("#update-form");
    await api.put(`/tasks/${modalUpdateItem.id}`, { title: form.title.value });
    const taskIndex = tasks.findIndex((element => element.id === modalUpdateItem.id));
    tasks[taskIndex].title = form.title.value;
    setModalUpdateStatus('');
  }

  const showDeleteModal = (id) => {

    const task = tasks.find(element => element.id === id);
    setModalDeleteItem(task);
    setModalDeleteStatus('show');
  }

  const showUpdateModal = (id) => {

    const task = tasks.find(element => element.id === id);
    setModalUpdateItem(task);
    setModalUpdateStatus('show');
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
                  onClickUpdate={() => showUpdateModal(task.id)} 
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
          <Button onClick={() => handleDeleteTask()} className="danger btn-lg px">DELETE</Button>
        </div>
      </Modal>

      <Modal status={modalUpdateStatus} title="Update Task" closeModal={() => setModalUpdateStatus('')}>
        <form id="update-form">
          <div className="modal-body">
            <label>Title</label>
            <input name="title" type="text" defaultValue={modalUpdateItem.title} placeholder="Ex: Plan family trip..." />
          </div>
          <div className="modal-footer">
            <Button onClick={() => setModalUpdateStatus('')} className="secondary btn-lg px">CLOSE</Button>
            <Button onClick={() => handleUpdateTask()} className="primary btn-lg px">UPDATE</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;