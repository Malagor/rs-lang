import {
  COLOR_FONT_BLACK,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_YELLOW,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_WHITE,
  COLOR_LAYOUT_ORANGE,
} from 'appConstants/colors';
import styled from 'styled-components/macro';
import { lighten } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CloseIcon from '@material-ui/icons/Close';

type AnswerStatType = 'inARow' | 'right' | 'wrong';

const textMixin = (size: 'bigger' | 'smaller') => `
  font-size: ${size === 'bigger' ? '16px ' : '14px'};
  line-height: ${size === 'bigger' ? '24px ' : '16px'};
  font-weight: 400;
  color: ${COLOR_FONT_BLACK};
`;

const pickBackground = (type: AnswerStatType) => {
  switch (type) {
    case 'inARow':
      return COLOR_LAYOUT_YELLOW;
    case 'right':
      return COLOR_LAYOUT_BLUE;
    case 'wrong':
      return COLOR_LAYOUT_ORANGE;
    default:
      return COLOR_LAYOUT_BLUE;
  }
};

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 307px;
  background: ${COLOR_LAYOUT_WHITE};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  color: ${COLOR_LAYOUT_DARK_GRAY};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 348px;
  padding: 16px 0;
  border-bottom: 3px solid ${COLOR_LAYOUT_GRAY};
`;

export const ModalName = styled.h3`
  margin: 0;
  font-size: 35px;
  line-height: 35px;
  font-weight: 400;
  color: ${COLOR_FONT_BLACK};
`;

export const PlayAgainButton = styled.button`
  padding: 8px 32px;
  border: none;
  background: ${COLOR_LAYOUT_BLUE};
  font-size: 16px;
  line-height: 24px;
  color: white;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${lighten(COLOR_LAYOUT_BLUE, 0.2)};
  }
`;

export const Content = styled.div`
  width: 352px;
  height: 185px;
  margin-top: 24px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: ${COLOR_LAYOUT_GRAY} ${COLOR_LAYOUT_WHITE};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR_LAYOUT_GRAY};
    border-radius: 10px;
  }
`;

export const AnswerStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const AccuracyContainer = styled.div`
  width: 114px;
  text-align: center;

  .accuracy-bar {
    width: 112px;
    height: 112px;
    margin-bottom: 6px;
  }
`;

export const AccuracyWord = styled.p`
  margin: 0;
  ${textMixin('bigger')}
`;

export const StripesContainer = styled.div`
  width: 100%;
  padding: 4px 16px 0 24px;
`;

export const StripesBlock = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
  list-style: none;
`;

export const Stripe = styled.li<{
  type: AnswerStatType;
  share: number;
}>`
  width: ${({ share }) => `${share * 100}%`};
  height: 8px;
  background: ${({ type }) => pickBackground(type)};
  border-radius: 10px;
`;

export const Legend = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

export const LegendItemMarker = styled.div<{ type: AnswerStatType }>`
  width: 8px;
  height: 8px;
  margin-right: 8px;
  background: ${({ type }) => pickBackground(type)};
  border-radius: 50%;
`;

export const LegendItemText = styled.span`
  ${textMixin('smaller')}
`;

export const LearnedWordsTotal = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
  ${textMixin('bigger')}
`;

export const CategoryContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const CategoryHeaderContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

export const CategoryHeader = styled.h4`
  margin: 0;
  margin-right: 16px;
  ${textMixin('bigger')}
  color: ${COLOR_LAYOUT_DARK_GRAY}
`;

export const MistakesNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  background: ${COLOR_LAYOUT_ORANGE};
  border-radius: 5px;
  color: ${COLOR_LAYOUT_BACKGROUND};
`;

export const CorrectNumber = styled(MistakesNumber)`
  background: ${COLOR_LAYOUT_BLUE};
`;

export const LearnedWordsTotalNumber = styled(CorrectNumber)`
  margin-right: 8px;
`;

export const WordList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const WordItem = styled.li`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const SoundIcon = styled(VolumeUpIcon)`
  margin-right: 8px;
  cursor: pointer;
`;

export const WordItself = styled.span`
  color: ${COLOR_FONT_BLACK};
  text-transform: capitalize;
`;

export const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: -24px;
  right: -24px;
  color: ${COLOR_LAYOUT_BACKGROUND};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${COLOR_LAYOUT_DARK_GRAY};
  }
`;
