import styled from 'styled-components';

export const Wrapper = styled.div`
  .button-group {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px 20px;
  }

  .active,
  .correct,
  .incorrect {
    color: #fff;
  }

  .active {
    background: indigo;
  }

  .correct {
    background: #5ca943;
  }

  .incorrect {
    background: #eb5a46;
  }

  .submit {
    display: block;
    margin: auto;
  }
`;
