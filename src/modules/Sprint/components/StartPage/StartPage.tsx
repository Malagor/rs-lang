import React, { FC } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Grid,
} from '@material-ui/core';
import { COUNT_GROUPS } from 'appConstants/index';
import { useStyles } from './styled';
import { TGamePages, PLAY_PAGE } from '../../Sprint';

type StartPageProps = {
  setGamePage: (page: TGamePages) => void;
  setGroup: React.Dispatch<React.SetStateAction<number>>;
  group: number;
};

const arrayNumberOfPage = Array.from({ length: COUNT_GROUPS }, (v, k) => k);

export const StartPage: FC<StartPageProps> = ({
  setGamePage,
  setGroup,
  group,
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(Number((event.target as HTMLInputElement).value));
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item>
        <FormControl component="fieldset" className={classes.wrapperForm}>
          <FormLabel component="legend" className={classes.legend}>
            <Typography variant="h5">Select level</Typography>
          </FormLabel>
          <RadioGroup
            onChange={handleChange}
            row
            aria-label="position"
            name="position"
            defaultValue={String(group)}
            className={classes.levelBox}
          >
            {arrayNumberOfPage.map((numberGroup: number) => (
              <FormControlLabel
                key={numberGroup}
                value={String(numberGroup)}
                control={<Radio color="primary" />}
                label={numberGroup + 1}
                labelPlacement="bottom"
                className={classes.root}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item className={classes.contentWrapper}>
        <Typography variant="h3" className={classes.title}>
          Sprint
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          Teaches you how to quickly translate from English into Russian. For
          this workout, words from your vocabulary and random words are used.
        </Typography>
      </Grid>

      <Grid item className={classes.buttonWrapper}>
        <Button
          onClick={() => setGamePage(PLAY_PAGE)}
          variant="contained"
          color="primary"
          className={classes.buttonColor}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
};
