import * as actions from './actions';

export const incrementGeneration = () => {
  return {
    type: actions.INCREMENT_GENERATION
  };
};

export const resetGeneration = () => {
  return {
    type: actions.RESET_GENERATION
  };
};
