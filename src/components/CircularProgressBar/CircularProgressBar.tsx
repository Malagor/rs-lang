import React, { FC, useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_TEXT,
  COLOR_LAYOUT_YELLOW,
} from 'appConstants/colors';

type CircularProgressBarProps = {
  percentage: number;
  className?: string;
  props?: {
    fontSize?: number;
    trailColor?: string;
    pathColor?: string;
    textColor?: string;
  };
};

export const CircularProgressBar: FC<CircularProgressBarProps> = ({
  percentage,
  className,
  props,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(percentage);
    }, 500);
   return () => {
		 clearTimeout(timeout);
		 }
  }, [percentage]);

  return (
    <CircularProgressbar
      className={className ?? ''}
      value={value}
      text={`${percentage}%`}
      strokeWidth={7}
      styles={buildStyles({
        textSize: props?.fontSize ? `${props.fontSize}px` : '25px',
        pathColor: props?.pathColor ? props.pathColor : COLOR_LAYOUT_YELLOW,
        textColor: props?.textColor ? props.textColor : COLOR_LAYOUT_TEXT,
        trailColor: props?.trailColor ? props.trailColor : COLOR_LAYOUT_GRAY,
        pathTransitionDuration: 0.7,
      })}
    />
  );
};
