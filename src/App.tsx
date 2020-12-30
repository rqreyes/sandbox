import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

import QuestionItem from './components/QuestionItem';
import { GlobalStyle, Wrapper } from './App.styles';

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

const App = () => {
  const [triviaType, setTriviaType] = useState('');
  const [triviaStart, setTriviaStart] = useState(false);
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
    triviaType === 'random' ? 'https://opentdb.com/api.php?amount=10' : null,
    questionListFetch,
    {
      revalidateOnFocus: false,
    }
  );

  const triviaStartRandom = () => {
    setTriviaType('random');
    setTriviaStart(true);
  };

  const triviaRestart = () => {
    mutate();
    setTriviaStart(false);
    setQuestionIdx(0);
    setScore(0);
  };

  let quizDisplay;

  if (triviaType === 'random' && error) {
    quizDisplay = (
      <p>
        Oops! Something went wrong on our end. Please try reloading the page.
      </p>
    );
  } else if (triviaType === 'random' && !data) {
    quizDisplay = <p>Loading...</p>;
  } else if (!triviaStart) {
    quizDisplay = (
      <>
        <h2>Select type</h2>
        <button type='button' onClick={triviaStartRandom}>
          Random
        </button>
        <button type='button'>uwu</button>
      </>
    );
  } else {
    quizDisplay = (
      <>
        {questionIdx + 1 === data.length ? (
          <div className='game-over'>
            <h2>Game Over</h2>
            <p>You got {(score / data.length) * 100}% correct</p>
            <button type='button' onClick={triviaRestart}>
              Play again?
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
        <main>{quizDisplay}</main>
        <footer>
          <p>
            Score
            {data && data.length && (
              <>
                : {score} / {data.length}
              </>
            )}
          </p>
        </footer>
      </Wrapper>
    </>
  );
};

export default App;
