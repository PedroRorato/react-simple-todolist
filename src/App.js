import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Container from './components/Container/Container';

function App() {
  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <h2>Insira a nova tarefa</h2>
      </Container>
    </>
  );
}

export default App;
