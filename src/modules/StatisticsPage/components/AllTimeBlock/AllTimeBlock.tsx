import React, { FC } from 'react';
import { COLOR_LAYOUT_BLUE, COLOR_LAYOUT_YELLOW } from 'appConstants/colors';
import { Graph } from './components/Graph';
import { useStyles } from './styled';

type AllTimeBlockProps = {
  learnedWordsByDays: {
    [data: string]: number;
  };
};

export const AllTimeBlock: FC<AllTimeBlockProps> = ({ learnedWordsByDays }) => {
  const classes = useStyles();

  const wordsByDaysPoints = Object.entries(learnedWordsByDays).map(
    ([date, value]) => ({
      x: date,
      y: value,
    })
  );

  const wordsGrowthPoints: { x: string; y: number }[] = [];

  Object.entries(learnedWordsByDays).forEach(([date, value]) => {
    const point = {
      x: date,
      y: wordsGrowthPoints.length
        ? value + wordsGrowthPoints[wordsGrowthPoints.length - 1].y
        : value,
    };

    wordsGrowthPoints.push(point);
  });

  return (
    <div className={classes.container}>
      <Graph
        title="Learned words"
        label="Words"
        color={COLOR_LAYOUT_YELLOW}
        points={wordsByDaysPoints}
      />
      <Graph
        title="Learned words growth"
        label="Words"
        color={COLOR_LAYOUT_BLUE}
        points={wordsGrowthPoints}
      />
    </div>
  );
};
