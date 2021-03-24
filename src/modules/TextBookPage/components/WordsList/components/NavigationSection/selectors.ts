import { State } from 'types';

export const selectPage = (state: State) => state.textBookReducer.page;
