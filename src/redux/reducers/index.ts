import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import gameAvatarReducer from './gameAvatar';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  tab: tabReducer,
  gameAvatar: gameAvatarReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
