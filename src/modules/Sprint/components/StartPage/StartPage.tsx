import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { TGamePages, PLAY_PAGE } from '../../Sprint';

type StartPageProps = {
  setGamePage: (page: TGamePages) => void;
};

export const StartPage: FC<StartPageProps> = ({ setGamePage }) => {
  const test = 1;

  return (
    <>
      <div>SelectorLevel</div>
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
