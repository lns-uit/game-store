export interface StateUrl{
  email: any
}

const initialState = {
  email: null
}

interface ActionEmail {
  payload: any;
  type: string;
}

const getEmail = (state: StateUrl = initialState, action: ActionEmail) => {
  switch (action.type) {
    case 'getEmail':
      return action.payload
    default:
      return state;
  }
};

export default getEmail;
