import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Avatar, Typography, Grid } from '@material-ui/core';
import { PlayButton, useStyles } from './styled';

type GameCardProps = {
  img: string;
  name: string;
  description: string;
  link: string;
  colorButton: string;
};

export const GameCard: FC<GameCardProps> = ({
  img,
  name,
  description,
  link,
  colorButton,
}) => {
  const styleProps = { colorButton };
  const classes = useStyles(styleProps);

  const history = useHistory();

  const onGoToGamePage = () => {
    history.push(link);
  };

  return (
    <Grid key={name} container item xs={12} md={6} className={classes.wrapper}>
      <Card className={`${classes.cardWrapper} ${classes.wrapper}`}>
        <Grid item xs={12} className={classes.avatarWrapper}>
          <Avatar alt={name} src={img} className={classes.avatarSize} />
        </Grid>
        <Grid item xs={12} className={classes.titleWrapper}>
          <Typography className={classes.title}>{name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.descriptionWrapper}>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.buttonWrapper}>
          <PlayButton
            onClick={onGoToGamePage}
            variant="contained"
            disableRipple
            className={`${classes.margin} ${classes.root}`}
          >
            play
          </PlayButton>
        </Grid>
      </Card>
    </Grid>
  );
};
