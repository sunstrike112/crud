import { combineReducers } from 'redux';
import { CRUDReducer } from './slices/CRUDSlice';

const rootReducer = combineReducers({
  CRUDReducer
});

export default rootReducer;
