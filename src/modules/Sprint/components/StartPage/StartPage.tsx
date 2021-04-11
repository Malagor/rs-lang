import React, { FC } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { COUNT_GROUPS } from 'appConstants/index';
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(Number((event.target as HTMLInputElement).value));
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">labelPlacement</FormLabel>
        <RadioGroup
          onChange={handleChange}
          row
          aria-label="position"
          name="position"
          defaultValue={String(group)}
        >
          {arrayNumberOfPage.map((numberGroup: number) => (
            <FormControlLabel
              key={numberGroup}
              value={String(numberGroup)}
              control={<Radio color="primary" />}
              label={numberGroup + 1}
              labelPlacement="top"
            />
          ))}
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
