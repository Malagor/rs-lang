import { Reducer } from 'redux';
import { StateCommon } from 'types';
import {
  SET_LOGIN_MODAL_OPEN,
  SET_PAGE_TITLE,
  SET_REGISTRATION_MODAL_OPEN,
} from './actionConsts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = { type: string; payload: any };

export const commonState: StateCommon = {
  title: '',
  isLoginModalOpen: false,
  isRegistrationModalOpen: false,
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

    case SET_LOGIN_MODAL_OPEN:
      return {
        ...state,
        isLoginModalOpen: action.payload,
      };

    case SET_REGISTRATION_MODAL_OPEN:
      return {
        ...state,
        isRegistrationModalOpen: action.payload,
      };

    default:
      return state;
  }
};
