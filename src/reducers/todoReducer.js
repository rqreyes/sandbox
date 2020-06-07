import * as actionTypes from '../constants/actionTypes';

const todosInit = [
  { id: 123, description: 'build todo app', completed: true },
  { id: 423, description: 'get a job', completed: false },
  { id: 564, description: 'make money', completed: false },
];

const todoReducer = (state = todosInit, action) => {
  switch (action.type) {
    case actionTypes.TODO_ADD:
      return [
        ...state,
        {
          id: state.length,
          description: action.payload.description,
          completed: false,
        },
      ];
    case actionTypes.TODO_REMOVE:
      return state.filter((todo) => action.payload.id !== todo.id);
    case actionTypes.TODO_COMPLETE:
      return state.map((todo) =>
        action.payload.id !== todo.id
          ? todo
          : { ...todo, completed: !todo.completed }
      );
    default:
      return state;
  }
};

export default todoReducer;
