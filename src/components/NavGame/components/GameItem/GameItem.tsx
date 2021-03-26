import React, { FC } from 'react';
import { GameName, Image, ItemContainer } from './styled';

type GamesProps = {
  img: string;
  name: string;
  lastItem?: boolean;
};

export const GameItem: FC<GamesProps> = ({ img, name, lastItem }) => (
  <ItemContainer lastItem={lastItem}>
    <Image src={img} alt="game icon" />
    <GameName>{name}</GameName>
  </ItemContainer>
);
