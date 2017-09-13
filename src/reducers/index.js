import {combineReducers} from 'redux';
import sizeReducer from './size';
import speedReducer from './speed';
export default combineReducers({
  size: sizeReducer,
  speed: speedReducer
});
