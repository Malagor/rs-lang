import {
  SET_LOGIN_MODAL_OPEN,
  SET_PAGE_TITLE,
  SET_REGISTRATION_MODAL_OPEN,
} from './actionConsts';

export const setPageTitle = (payload: string) => ({
  type: SET_PAGE_TITLE,
  payload,
});

export const setLoginModalOpen = (payload: boolean) => ({
  type: SET_LOGIN_MODAL_OPEN,
  payload,
});

export const setRegistrationModalOpen = (payload: boolean) => ({
  type: SET_REGISTRATION_MODAL_OPEN,
  payload,
});
