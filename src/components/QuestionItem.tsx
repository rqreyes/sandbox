import React, { useState } from 'react';
import classNames from 'classnames';

import { Wrapper } from './QuestionItem.styles';

interface Props {
  answerList: string[];
  correct_answer: string;
  setScore: () => void;
  setQuestionIdx: () => void;
  question: string;
}

const QuestionItem: React.FC<Props> = ({
  answerList,
  correct_answer,
  setScore,
  setQuestionIdx,
  question,
}) => {
  const [answerSelected, setAnswerSelected] = useState('');
  const [answerShow, setAnswerShow] = useState(false);

  const handleSelected = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setAnswerSelected(evt.currentTarget.value);
  };

  const handleSubmit = () => {
    setAnswerShow(true);
    if (answerSelected === correct_answer) setScore();
  };

  const handleNext = () => {
    setQuestionIdx();
    setAnswerSelected('');
    setAnswerShow(false);
  };

  return (
    <Wrapper>
      <p>
        <strong dangerouslySetInnerHTML={{ __html: question }} />
      </p>
      <div className='button-group'>
        {answerList.map((answerItem, idx) => (
          <button
            key={idx}
            className={classNames({
              active: answerItem === answerSelected,
              correct: answerShow && answerItem === correct_answer,
              incorrect:
                answerShow &&
                answerItem === answerSelected &&
                answerSelected !== correct_answer,
            })}
            value={answerItem}
            onClick={handleSelected}
          >
            <span dangerouslySetInnerHTML={{ __html: answerItem }} />
          </button>
        ))}
      </div>
      {answerShow ? (
        <button className='submit' onClick={handleNext}>
          Next
        </button>
      ) : (
        <button
          className='submit'
          disabled={!!!answerSelected}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </Wrapper>
  );
};

export default QuestionItem;
