import React from 'react';
import { useDispatch } from 'react-redux';
import { todoRemove, todoComplete } from '../../actions';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const completeClass = todo.completed ? 'completed' : '';

  return (
    <li>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => dispatch(todoComplete(todo.id))}
      />
      <p className={completeClass}>{todo.description}</p>
      <button type='button' onClick={() => dispatch(todoRemove(todo.id))}>
        remove
      </button>
    </li>
  );
};

export default Todo;
