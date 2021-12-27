export interface StateUrl{
  forgot: any;
}

interface ForgotActionType {
  paylod?: any,
  type: string
}

const forgotPasswordReducer = (state = false, action: ForgotActionType) => {
  switch (action.type) {
    case 'forgot':
      return action.paylod || true;
    default:
      return state;
  }
};

export default forgotPasswordReducer;
