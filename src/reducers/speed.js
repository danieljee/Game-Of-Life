import * as actions from '../actions/actions';

const initialState = {
  simSpeed: 2,
  paused: false
}

export default function(state=initialState, action){
  switch(action.type){
    case actions.PAUSE_GAME:
      return Object.assign({}, state, {paused:true});
    case actions.PAUSE_GAME:
      return Object.assign({}, state, {paused:false});
    case actions.SPEED_SLOW:
      return Object.assign({}, state, {simSpeed: 0});
    case actions.SPEED_NORMAL:
      return Object.assign({}, state, {simSpeed: 1});
    case actions.SPEED_FAST:
      return Object.assign({}, state, {simSpeed: 2});
    default:
      return state;
  }
}
