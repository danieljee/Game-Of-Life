import * as actions from '../actions/actions';

const initialState = {
  simSpeed: 200,
  paused: false,
  cleared: false
}

export default function(state=initialState, action){
  switch(action.type){
    case actions.PAUSE_GAME:
      return Object.assign({}, state, {paused:true, generation: 0});
    case actions.RESUME_GAME:
      return Object.assign({}, state, {paused:false, cleared: false});
    case actions.CLEAR_GAME:
      return Object.assign({}, state, {paused:true , cleared:true});
    case actions.SET_INTERVAL_ID:
      return Object.assign({}, state, {intervalId: action.intervalId});
    case actions.SPEED_SLOW:
      return Object.assign({}, state, {simSpeed: 700});
    case actions.SPEED_NORMAL:
      return Object.assign({}, state, {simSpeed: 300});
    case actions.SPEED_FAST:
      return Object.assign({}, state, {simSpeed: 200});
    default:
      return state;
  }
}
