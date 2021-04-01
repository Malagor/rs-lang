export const getCountWords = (arrayWithCount: Array<{ count: number }>) => {
  let countWords = 0;
  if (arrayWithCount.length) {
    countWords = arrayWithCount[0].count;
  }

  return countWords;
};
