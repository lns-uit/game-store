import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import gameAvatarReducer from './gameAvatar';
import userReducer from './userReducer';
import getEmail from './getEmail';

const rootReducer = combineReducers({
  tab: tabReducer,
  gameAvatar: gameAvatarReducer,
  user: userReducer,
  email: getEmail
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
