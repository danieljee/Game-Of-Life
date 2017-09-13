import {combineReducers} from 'redux';
import sizeReducer from './size';
import speedReducer from './speed';
import otherReducer from './other';
export default combineReducers({
  size: sizeReducer,
  speed: speedReducer,
  otherStates:otherReducer
});
