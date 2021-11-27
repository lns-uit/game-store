import rootType from '../types';

const login = (user) => {
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
