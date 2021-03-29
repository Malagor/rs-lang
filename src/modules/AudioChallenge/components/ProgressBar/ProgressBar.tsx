import React, { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { COLOR_LAYOUT_WHITE, LEVEL_COLORS } from 'appConstants/colors';
import 'react-circular-progressbar/dist/styles.css';

import { useSelector } from 'react-redux';
import { ProgressBarWrapper } from './styled';
import { selectAudioCurrentWord } from '../../selectors';

type AudioProgressBarProps = {
  group: number;
  totalCount: number;
};

export const ProgressBar: FC<AudioProgressBarProps> = ({
  group,
  totalCount,
}) => {
  const current = useSelector(selectAudioCurrentWord);

  return (
    <ProgressBarWrapper>
      <CircularProgressbar
        value={current}
        maxValue={totalCount}
        text={`${current}/${totalCount}`}
        styles={buildStyles({
          // Colors
          pathColor: `${LEVEL_COLORS[group]}`,
          textColor: `${LEVEL_COLORS[group]}`,
          trailColor: `${COLOR_LAYOUT_WHITE}`,
          backgroundColor: '#24c741',
        })}
      />
    </ProgressBarWrapper>
  );
};
