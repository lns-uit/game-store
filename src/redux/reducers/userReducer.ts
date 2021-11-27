import rootType from '../types';

interface LoginType{
  idUser: string,
  userName: string
}

const loginState = {
  idUser: null,
  idName: null
}

interface ActionType {
  payload?: any;
  type: string;
}
<<<<<<< HEAD
const userReducer = (state = null, action: ActionType) => {
=======

const tabReducer = (state = loginState, action: ActionType) => {
>>>>>>> move index.js file from functions folder to utils and fix redux sign in
  switch (action.type) {
    case rootType.user.LOGIN:
      return action.payload;
    case rootType.user.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
