import * as actions from './actions';

export const changeSizeSmall = () => {
  return {
    type: actions.SIZE_SMALL
  };
};
export const changeSizeMedium = () => {
  return {
    type: actions.SIZE_MEDIUM
  };
};
export const changeSizeBig = () => {
  return {
    type: actions.SIZE_BIG
  };
};
