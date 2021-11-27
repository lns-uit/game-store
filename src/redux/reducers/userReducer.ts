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
const userReducer = (state = null, action: ActionType) => {
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
