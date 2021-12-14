export interface StateUrl{
  forgot: boolean;
}

const initialState ={
  forgot: false,
}

interface ForgotActionType {
  forgot: boolean,
  type: string
}

const forgotPasswordReducer = (state: StateUrl = initialState, action: ForgotActionType) => {
  switch (action.type) {
    case 'forgot':
      return action.forgot;
    default:
      return state;
  }
};

export default forgotPasswordReducer;
