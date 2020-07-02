import React, { useState, ChangeEvent } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface iGridSizeProps {
  handleGridSize: iHandleGridSize;
}

const GridSize: React.FC<iGridSizeProps> = ({ handleGridSize }) => {
  const [gridInput, setGridInput] = useState('');

  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleGridSize(parseInt(gridInput));
    setGridInput('');
  };

  return (
    <section className='grid-size'>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Enter NxN grid number:</span>
          <Input
            type='number'
            value={gridInput}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              setGridInput(evt.target.value)
            }
          />
        </label>
        <Button type='submit'>Let's play</Button>
      </form>
    </section>
  );
};

export default GridSize;
