import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

/*
Instructions:
Recreate https://dog.ceo/dog-api/breeds-list
1) Create a dropdown that will show all the main dog breeds
2) Once a breed is selected, render an image based off the selected breed
3) When the Fetch! button is clicked, the application should grab and
render a different image for the selected breed.
*/

export default function App() {
  const [breedList, setBreedList] = useState({});
  const [breedSelected, setBreedSelected] = useState('');
  const [breedImg, setBreedImg] = useState('');

  // fetch random breed image
  const handleClick = async () => {
    try {
      const breedImgRes = await axios.get(
        `https://dog.ceo/api/breed/${breedSelected}/images/random`
      );
      setBreedImg(breedImgRes.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // display breed options including sub-breeds
  const breedListDisplay = (
    <select
      onChange={(evt) => setBreedSelected(evt.target.value.split(' ').pop())}
    >
      {Object.keys(breedList).map((breedItem, idx) => {
        if (breedList[breedItem].length)
          return breedList[breedItem].map((subBreed, idx) => (
            <option key={idx}>{`${subBreed} ${breedItem}`}</option>
          ));
        else return <option key={idx}>{breedItem}</option>;
      })}
    </select>
  );

  // display breed image
  const breedImgDisplay = breedImg ? (
    <img src={breedImg} alt='dog breed' />
  ) : null;

  // fetch image every time a dropdown option is selected
  useEffect(() => {
    (async () => {
      try {
        if (breedSelected) {
          const breedImgRes = await axios.get(
            `https://dog.ceo/api/breed/${breedSelected}/images/random`
          );
          setBreedImg(breedImgRes.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [breedSelected]);

  // fetch to https://dog.ceo/api/breeds/list/all
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreedList(data.message);
        setBreedSelected(Object.keys(data.message)[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className='App'>
      <h1>Breeds List</h1>
      <h2>
        https://dog.ceo/api/breed/
        {breedListDisplay}
        /images/random
      </h2>
      <button
        onClick={handleClick}
        style={{ display: 'block', margin: '0 auto 20px' }}
      >
        Fetch!
      </button>
      {breedImgDisplay}
    </div>
  );
}
