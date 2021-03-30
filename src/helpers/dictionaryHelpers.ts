export const getCountWords = (arrayWithCount: Array<{ count: number }>) => {
  let countWords;
  if (arrayWithCount.length) {
    countWords = arrayWithCount[0].count;
  } else {
    countWords = 0;
  }
  return countWords;
};
