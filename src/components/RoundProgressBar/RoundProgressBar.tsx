import React, { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { COLOR_LAYOUT_WHITE, LEVEL_COLORS } from 'appConstants/colors';
import 'react-circular-progressbar/dist/styles.css';

import { ProgressBarWrapper } from './styled';

type AudioProgressBarProps = {
  group: number;
  totalCount: number;
  current: number;
};

export const RoundProgressBar: FC<AudioProgressBarProps> = ({
  group,
  totalCount,
  current,
}) => (
  <ProgressBarWrapper>
    <CircularProgressbar
      value={current}
      maxValue={totalCount}
      text={`${current}/${totalCount}`}
      styles={buildStyles({
        pathColor: `${LEVEL_COLORS[group]}`,
        textColor: `${LEVEL_COLORS[group]}`,
        trailColor: `${COLOR_LAYOUT_WHITE}`,
      })}
    />
  </ProgressBarWrapper>
);
