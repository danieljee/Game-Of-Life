import * as actions from '../actions/actions';
const initialState = {
  generation: 0
}

export default function(state=initialState, action){
  switch(action.type){
    case actions.INCREMENT_GENERATION:
      return Object.assign({}, state, {generation: state.generation + 1});
    case actions.RESET_GENERATION:
      return Object.assign({}, state, {generation: 0});
    case actions.CLEAR_GAME:
      return Object.assign({}, state, {generation:0});
    default:
      return state;
  }
}
