import React from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  width: 40px;
  height: ${({ numCount }) => `${numCount * 10}px`};
  background: grey;
  margin: 0 10px;
`;

const NumBar = ({ numCount }) => {
  return <StyledBar numCount={numCount} />;
};

export default NumBar;
