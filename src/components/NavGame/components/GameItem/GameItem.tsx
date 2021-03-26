import React, { FC } from 'react';
import { GameName, Image, ItemContainer } from './styled';

type GamesProps = {
  img: string;
  name: string;
};

export const GameItem: FC<GamesProps> = ({ img, name }) => (
  <ItemContainer>
    <Image src={img} alt="game icon" />
    <GameName>{name}</GameName>
  </ItemContainer>
);
