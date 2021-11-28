import rootType from '../types';

const login = (user: any) => {
  return {
    type: rootType.user.LOGIN,
    payload: user,
  };
};

const logout = () => {
  return {
    type: rootType.user.LOGOUT,
  };
};

export { login, logout };
