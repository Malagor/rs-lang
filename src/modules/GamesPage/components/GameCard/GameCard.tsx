import React, { FC } from 'react';
import { Card, Avatar, Typography, Grid } from '@material-ui/core';
import { ChosenGameProps } from 'types';
import { PlayButton, useStyles } from './styled';

type GameCardProps = {
  img: string;
  name: string;
  description: string;
  link: string;
  colorButton: string;
  setChosenGame: React.Dispatch<React.SetStateAction<ChosenGameProps | null>>;
};

export const GameCard: FC<GameCardProps> = ({
  img,
  name,
  description,
  link,
  colorButton,
  setChosenGame,
}) => {
  const styleProps = { colorButton };
  const classes = useStyles(styleProps);

  const handlePlayButtonClick = () => {
    setChosenGame({ gameName: name, gameLink: link, gameColor: colorButton });
  };

  return (
    <Card key={name} className={`${classes.cardWrapper} ${classes.wrapper}`}>
      <Grid container className={classes.wrapper}>
        <Grid container>
          <Grid
            item
            xs={12}
            className={`${classes.avatarWrapper} ${classes.wrapper}`}
          >
            <Avatar alt={name} src={img} className={classes.avatarSize} />
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.titleWrapper} ${classes.wrapper}`}
          >
            <Typography className={classes.title}>{name}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.descriptionWrapper} ${classes.wrapper}`}
        >
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.buttonWrapper} ${classes.wrapper}`}
        >
          <PlayButton
            onClick={handlePlayButtonClick}
            variant="contained"
            disableRipple
            className={`${classes.margin} ${classes.root}`}
          >
            play
          </PlayButton>
        </Grid>
      </Grid>
    </Card>
  );
};
