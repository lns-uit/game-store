export interface StateUrl{
  name: any;
  url: any;
}

const initialState ={
  name: null,
  url: null
}

interface GameActionType {
  name: string,
  url: string;
  type: string;
}

const avatarGameReducer = (state: StateUrl = initialState, action: GameActionType) => {
  switch (action.type) {
    case 'getLink':
      console.log(action.url);
      return {
        name: action.name,
        url: action.url
      };
    default:
      return state;
  }
};

export default avatarGameReducer;
