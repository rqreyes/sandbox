import * as actionTypes from '../constants/actionTypes';

export const todoAdd = (description) => {
  return {
    type: actionTypes.TODO_ADD,
    payload: {
      description,
    },
  };
};

export const todoRemove = (id) => {
  return {
    type: actionTypes.TODO_REMOVE,
    payload: {
      id,
    },
  };
};

export const todoComplete = (id) => {
  return {
    type: actionTypes.TODO_COMPLETE,
    payload: {
      id,
    },
  };
};
