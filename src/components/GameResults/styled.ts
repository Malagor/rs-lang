import {
  COLOR_FONT_BLACK,
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_DARK_GRAY,
  COLOR_LAYOUT_GRAY,
  COLOR_LAYOUT_WHITE,
} from 'appConstants/colors';
import styled from 'styled-components';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CloseIcon from '@material-ui/icons/Close';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 368px;
  height: 272px;
  background: ${COLOR_LAYOUT_WHITE};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  color: ${COLOR_LAYOUT_DARK_GRAY};
`;

export const Content = styled.div`
  width: 300px;
  height: 225px;
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

export const CategoryContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

export const Header = styled.h4`
  margin: 0;
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

export const MistakesNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  background: ${COLOR_LAYOUT_DARK_GRAY};
  border-radius: 5px;
  color: ${COLOR_LAYOUT_BACKGROUND};
`;

export const CorrectNumber = styled(MistakesNumber)`
  background: ${COLOR_LAYOUT_BLUE};
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
