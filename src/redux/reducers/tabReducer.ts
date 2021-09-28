import rootType from '../types';

interface ActionType {
  payload?: any;
  type: string;
}

const tabReducer = (state = '/', action: ActionType) => {
  switch (action.type) {
    case rootType.tab.setTab:
      return action.payload;
    default:
      return state;
  }
};

export default tabReducer;
