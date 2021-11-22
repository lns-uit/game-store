import { combineReducers } from 'redux';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
  tab: tabReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
