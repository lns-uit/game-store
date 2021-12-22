import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import gameAvatarReducer from './gameAvatar';
import userReducer from './userReducer';
import getEmail from './getEmail';
import forgotPasswordReducer from './forgotPassword';
import suggestionGameReducer from './suggestionGame';

const rootReducer = combineReducers({
  tab: tabReducer,
  gameAvatar: gameAvatarReducer,
  user: userReducer,
  email: getEmail,
  forgotPassword: forgotPasswordReducer,
  discoverGame: suggestionGameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
