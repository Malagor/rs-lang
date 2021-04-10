import React, { FC } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { SAVANNAH_LIVES } from 'appConstants/games';
import { LivesWrapper } from './styled';

type LivesProps = {
  lives: number;
};

const livesArray = Array(SAVANNAH_LIVES)
  .fill(1)
  .map((_, i) => i);

export const Lives: FC<LivesProps> = ({ lives }) => {
  console.log('lives', lives);

  return (
    <LivesWrapper>
      {livesArray.map((value) => {
        if (SAVANNAH_LIVES - value - lives > 0) {
          return <FavoriteBorderIcon key={value} />;
        }
        return <FavoriteIcon key={value} />;
      })}
    </LivesWrapper>
  );
};
