import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NumBar from './components/NumBar';

const StyledApp = styled.div`
  margin: 10vh auto 0;

  hr {
    margin-top: 0;
  }
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledYAxisContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  border-right: 1px solid black;
`;

const StyledYAxis = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100px;
`;

const StyledNumBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 1px solid black;
  margin-bottom: 9px;
`;

const StyledXAxisContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 31px;
`;

const StyledXAxis = styled.span`
  display: inline-block;
  width: 50px;
  text-align: center;
  margin: 0 5px;
`;

const App = () => {
  const [numbers, setNumbers] = useState({});

  const numBarDisplay = Object.keys(numbers).map((num, idx) => (
    <NumBar key={idx} numCount={numbers[num]} />
  ));
  const xAxisDisplay = Object.keys(numbers).map((num, idx) => (
    <StyledXAxis key={idx}>{num}</StyledXAxis>
  ));

  let yAxisNums = [];
  let yMax = Math.ceil(Math.max(...Object.values(numbers)) / 10) * 10;
  while (yMax >= 0) {
    yAxisNums.push(yMax);
    yMax -= 10;
  }
  const yAxisDisplay = yAxisNums.map((num, idx) => (
    <StyledYAxis key={idx}>{num}</StyledYAxis>
  ));

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'
      );

      const dataArr = data.split('\n');
      dataArr.pop();
      const dataNum = dataArr.reduce((numCount, num) => {
        numCount[num] = (numCount[num] || 0) + 1;
        return numCount;
      }, {});

      setNumbers(dataNum);
    })();
  }, []);

  return (
    <StyledApp>
      <StyledRow>
        <StyledYAxisContainer>{yAxisDisplay}</StyledYAxisContainer>
        <StyledNumBarContainer>{numBarDisplay}</StyledNumBarContainer>
      </StyledRow>
      <StyledXAxisContainer>{xAxisDisplay}</StyledXAxisContainer>
    </StyledApp>
  );
};

export default App;
