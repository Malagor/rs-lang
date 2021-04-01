import React, { FC } from 'react';
import { fade, useTheme } from '@material-ui/core';
import { defaults, Line } from 'react-chartjs-2';
import { COLOR_LAYOUT_TEXT } from 'appConstants/colors';
import { useStyles } from './styled';

type GraphProps = {
  color: string;
  points: { x: string; y: number }[];
  label: string;
  title: string;
};

export const Graph: FC<GraphProps> = ({ color, points, label, title }) => {
  const classes = useStyles();
  const theme = useTheme();

  defaults.global.defaultFontColor = COLOR_LAYOUT_TEXT;
  defaults.global.defaultFontSize = 14;
  defaults.global.defaultFontFamily = theme.typography.fontFamily;

  const data = () => ({
    labels: [],
    datasets: [
      {
        label,
        backgroundColor: fade(color, 0.3),
        borderWidth: 2,
        borderColor: color,
        pointBorderColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointHoverRadius: 3,

        radius: 3,
        fill: 'start',
        data: points,
      },
    ],
  });

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 15,
      },
    },
    legend: {
      display: false,
    },

    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
            precision: 0,
          },
        },
      ],
      xAxes: [
        {
          distribution: 'series',
          gridLines: {
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
            maxTicksLimit: 15,
          },
          type: 'time',
          time: {
            tooltipFormat: 'll',
          },
        },
      ],
    },

    tooltips: {
      displayColors: false,
      titleFontStyle: 'normal',
      xPadding: 8,
      yPadding: 8,
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h4 className={classes.title}>{title}</h4>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
