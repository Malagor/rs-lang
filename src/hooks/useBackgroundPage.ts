import { useLocation } from 'react-router-dom';
import { gamesData } from 'appConstants/games';

export function useBackgroundPage(): string {
  const location = useLocation();

  const gameData = gamesData.find((data) => data.link === location.pathname);

  if (gameData) {
    return gameData.background;
  }
  return '';
}
