import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Comfortaa', cursive;
    color: #fff;
    background: linear-gradient(45deg, indigo, skyblue);
    background-size: cover;
  }

  header, footer {
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  header {
    top: 0;
    padding: 20px;
  }

  h1 {
    margin: 0;
  }

  h2 {
    font-weight: 400;
    margin: 0 0 10px 0;
  }

  p {
    font-size: 32px;
    margin: 0 0 20px 0;
  }

  button {
    width: calc((100% / 2) - 20px);
    font-size: 32px;
    color: indigo;
    background: #fff;
    padding: 10px 20px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    margin: 10px;
    cursor: pointer;

    :disabled {
      background: #ccc;
      cursor: auto;
    }
  }

  main {
    max-width: 720px;
    margin: 10% auto 0;
  }

  .game-over {
    text-align: center;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    position: absolute;
    left: 0;
    bottom: 0;
    
    p {
      margin: 0;
    }
  }
`;

export const Wrapper = styled.div``;
