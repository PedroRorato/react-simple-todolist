import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Card from './components/Card/Card';
import Input from './components/Input/Input';

function App() {
  return (
    <>
      <Header title="Simple Todo List" />
      <Container>
        <Card>
          <Input />
        </Card>
      </Container>
    </>
  );
}

export default App;
