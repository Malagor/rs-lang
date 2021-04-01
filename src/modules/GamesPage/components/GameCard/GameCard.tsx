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
    <Card key={name} className={`${classes.cardWrapper} ${classes.wrapper}`}>
      <Grid container item xs={12} className={classes.wrapper}>
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
            onClick={onGoToGamePage}
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
