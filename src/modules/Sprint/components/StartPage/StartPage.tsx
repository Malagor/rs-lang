import React, { FC } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { TGamePages, PLAY_PAGE } from '../../Sprint';

type StartPageProps = {
  setGamePage: (page: TGamePages) => void;
};

export const StartPage: FC<StartPageProps> = ({ setGamePage }) => {
  const test = 1;

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">labelPlacement</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="top"
            control={<Radio color="primary" />}
            label="Top"
            labelPlacement="top"
          />
          <FormControlLabel
            value="start"
            control={<Radio color="primary" />}
            label="Start"
            labelPlacement="start"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Bottom"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="end"
            control={<Radio color="primary" />}
            label="End"
          />
        </RadioGroup>
      </FormControl>
      <div>Description</div>
      <div>
        <Button
          onClick={() => setGamePage(PLAY_PAGE)}
          variant="contained"
          color="primary"
        >
          Start
        </Button>
      </div>
    </>
  );
};
