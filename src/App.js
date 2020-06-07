import React from 'react';
import './App.css';
import TodosList from './components/organisms/TodosList';
import TodosForm from './components/organisms/TodosForm';

function App() {
  return (
    <div className='App'>
      <h1>Todo List</h1>
      <TodosList />
      <TodosForm />
    </div>
  );
}

export default App;
