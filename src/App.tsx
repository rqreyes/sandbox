import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

import QuestionItem from './components/QuestionItem';
import { GlobalStyle, Wrapper } from './App.styles';

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

const App = () => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);

  // shuffle array
  const arrShuffle = (arr: string[]) => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const questionListFetch = async (url: string) => {
    const {
      data: { results },
    } = await axios.get(url);
    const questionList = results.map((result: Question) => {
      if (result.type === 'boolean') {
        return {
          answerList: ['True', 'False'],
          correct_answer: result.correct_answer,
          question: result.question,
        };
      } else {
        return {
          answerList: arrShuffle([
            result.correct_answer,
            ...result.incorrect_answers,
          ]),
          correct_answer: result.correct_answer,
          question: result.question,
        };
      }
    });

    return questionList;
  };

  const { data, error, mutate } = useSWR(
    'https://opentdb.com/api.php?amount=10',
    questionListFetch,
    {
      revalidateOnFocus: false,
    }
  );

  const gameRestart = () => {
    mutate();
    setQuestionIdx(0);
    setScore(0);
  };

  let quizDisplay;

  if (error) {
    quizDisplay = (
      <main>
        <p>
          Oops! Something went wrong on our end. Please try reloading the page.
        </p>
      </main>
    );
  } else if (!data) {
    quizDisplay = (
      <main>
        <p>Loading...</p>
      </main>
    );
  } else {
    quizDisplay = (
      <>
        <main>
          {questionIdx + 1 === data.length ? (
            <div className='game-over'>
              <h2>Game Over</h2>
              <p>You got {(score / data.length) * 100}% correct</p>
              <button type='button' onClick={gameRestart}>
                Play Again?
              </button>
            </div>
          ) : (
            <>
              <h2>Question {questionIdx + 1}</h2>
              <QuestionItem
                correct_answer={data[questionIdx].correct_answer}
                answerList={data[questionIdx].answerList}
                setScore={() => setScore((prev) => prev + 1)}
                setQuestionIdx={() => setQuestionIdx((prev) => prev + 1)}
                question={data[questionIdx].question}
              />
            </>
          )}
        </main>
        <footer>
          <p>
            Score: {score} / {data.length}
          </p>
        </footer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <header>
          <h1>Trivia Time</h1>
        </header>
        {quizDisplay}
      </Wrapper>
    </>
  );
};

export default App;
