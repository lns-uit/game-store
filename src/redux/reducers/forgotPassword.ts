export interface StateUrl{
  forgot: boolean;
}

const initialState ={
  forgot: false,
}

interface ForgotActionType {
  paylod: any,
  type: string
}

const forgotPasswordReducer = (state: StateUrl = initialState, action: ForgotActionType) => {
  switch (action.type) {
    case 'forgot':
      return action.paylod;
    default:
      return state;
  }
};

export default forgotPasswordReducer;
