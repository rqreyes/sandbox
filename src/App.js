import React, { useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import classNames from 'classnames';
import './App.css';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

const App = ({ onSelectItem }) => {
  const [exampleData, setExampleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // debounce function
  const debounceEvent = (...args) => {
    const debouncedEvent = debounce(...args);

    return (evt) => {
      evt.persist();
      return debouncedEvent(evt);
    };
  };

  // fetch data
  const handleChange = (evt) => {
    const fetchData = async () => {
      setIsLoading(true);

      // // fetch example api
      // const result = await axios(
      //   `${ITEMS_API_URL}?q=${evt.target.value}`
      // );

      // fetched example api result
      const result = ['Italy', 'Spain', 'Portugal', 'Macedonia'];

      setExampleData(result);
      setIsLoading(false);
    };

    fetchData();
  };

  // display control class
  const controlClass = classNames({
    control: true,
    'is-loading': isLoading,
  });

  // display list
  const listDisplay = exampleData.length ? (
    <div className='list is-hoverable'>
      {exampleData.map((string, idx) => (
        <a key={`${idx}`} className='list-item' onClick={onSelectItem}>
          {string}
        </a>
      ))}
    </div>
  ) : null;

  return (
    <div className='wrapper'>
      <div className={controlClass}>
        <input
          type='text'
          className='input'
          onChange={debounceEvent(handleChange, 250)}
        />
      </div>
      {listDisplay}
    </div>
  );
};

export default App;
