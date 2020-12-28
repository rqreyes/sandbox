import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  html {
    height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    background: lavender;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    font-size: 2rem;
    color: #fff;
    margin: 0;
  }

  h1 {
    font-size: 70px;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    height: 40px;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    padding: 0 40px;
    border: 2px solid #d38558;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    margin: 20px 0;
    cursor: pointer;
  }

  .start {
    max-width: 200px;
  }
`;
