import { useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import { GameName, Image, ItemContainer } from './styled';

type GamesProps = {
  img: string;
  name: string;
};

export const GameItem: FC<GamesProps> = ({ img, name }) => {
  const theme = useTheme();

  return (
  <ItemContainer theme={theme} >
    <Image src={img} alt="game icon" />
    <div>{name}</div>
  </ItemContainer>
);
}