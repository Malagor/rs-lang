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
      x: new Date(date),
      y: value,
    })
  );

  const progressPoints: { x: Date; y: number }[] = [];

  Object.entries(learnedWordsByDays).forEach(([date, value]) => {
    const point = {
      x: new Date(date),
      y: progressPoints.length
        ? value + progressPoints[progressPoints.length - 1].y
        : value,
    };

    progressPoints.push(point);
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
        title="Progress"
        label="Words"
        color={COLOR_LAYOUT_BLUE}
        points={progressPoints}
      />
    </div>
  );
};
