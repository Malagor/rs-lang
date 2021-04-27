// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mixingArray = (arr: any[]) => {
  const locArr = [...arr];
  locArr.sort(() => Math.random() - 0.5);
  return locArr;
};
