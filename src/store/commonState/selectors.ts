import { State } from 'types';

export const selectPageTitle = (state: State) => state.commonReducer.title;

export const selectPage = (state: State) => state.textBookReducer.page;

export const selectGroup = (state: State) => state.textBookReducer.group;
