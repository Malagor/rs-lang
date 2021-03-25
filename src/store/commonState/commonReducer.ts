import { Reducer } from 'redux';
import { StateCommon } from 'types';
import { SET_PAGE_TITLE } from './actionConsts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const commonState: StateCommon = {
  title: '',
};

export const commonReducer: Reducer<StateCommon, Action> = (
  state = commonState,
  action
) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    default:
      return state;
  }
};
