import rootType from '../types';

interface ActionType {
  payload?: any;
  type: string;
}

const tabReducer = (state = null, action: ActionType) => {
  switch (action.type) {
    case rootType.user.LOGIN:
      return action.payload;
    case rootType.user.LOGIN:
      return null;
    default:
      return state;
  }
};

export default tabReducer;
