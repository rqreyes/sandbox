import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdd } from '../../actions';

const TodosForm = () => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(todoAdd(description));
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <button type='submit'>add todo</button>
    </form>
  );
};

export default TodosForm;
