import * as actions from '../actions/actions';

const initialState = {
  width: 550,
  height: 330,
  columns: 50,
  rows: 30,
}

export default function(state=initialState, action){
  switch(action.type){
    case actions.SIZE_SMALL:
      return {
        width: 550,
        height: 330,
        columns: 50,
        rows: 30,
      };
    case actions.SIZE_MEDIUM:
      return {
        width: 700,
        height: 450,
        columns: 70,
        rows: 50
      };
    case actions.SIZE_BIG:
      return {
        width: 800,
        height: 600,
        columns: 100,
        rows: 80
      };
    default:
      return state;
  }
};
