import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import gameAvatarReducer from './gameAvatar'

const rootReducer = combineReducers({
  tab: tabReducer,
  gameAvatar: gameAvatarReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
