import { SET_PAGE_TITLE } from './actionConsts';

export const setPageTitle = (payload: string) => ({
  type: SET_PAGE_TITLE,
  payload,
});

// export const loadWords = (
//   group: number = 0,
//   page: number = 0
// ): ThunkAction<void, StateTextBook, unknown, Action<string>> => async (
//   dispatch
// ) => {
//   database
//     .getWords(group, page)
//     .then((words) => {
//       dispatch(setWords(words));
//     })
//     .catch((err) => {
//       throw new Error(`Can not read Words. ${err}`);
//     });
// };
