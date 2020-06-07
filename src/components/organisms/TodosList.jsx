import React from 'react';
import { useSelector } from 'react-redux';
import Todo from '../molecules/Todo';

const TodosList = () => {
  const todos = useSelector((state) => state.todos);
  const todosList = todos.map((todo) => {
    return <Todo key={`todo-${todo.id}`} todo={todo} />;
  });

  return <ul>{todosList}</ul>;
};

export default TodosList;
