import { State } from 'types';

export const selectPageTitle = (state: State) => state.commonReducer.title;
