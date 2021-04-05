import React, { FC, SyntheticEvent } from 'react';
import { List } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useDispatch } from 'react-redux';
import {
  URL_MAIN_PAGE,
  URL_TEXT_BOOK,
  URL_DICTIONARY,
  URL_GAMES,
  URL_STATISTICS,
} from 'appConstants/url';
import { logOutUser } from 'modules/Login/actions';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LogoutItem, MenuItem } from './components';

type SideNavProps = {};

const listStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

export const SideNav: FC<SideNavProps> = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  const handleListItemClick = (event: SyntheticEvent, index: number) => {
    setSelectedIndex(index);
  };

  const logout = () => {
    dispatch(logOutUser());
  };

  return (
    <List style={listStyles}>
      <MenuItem
        to={URL_MAIN_PAGE}
        title="Main"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 1}
        index={1}
      >
        <DashboardIcon />
      </MenuItem>

      <MenuItem
        to={URL_TEXT_BOOK}
        title="Textbook"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 2}
        index={2}
      >
        <LocalLibraryIcon />
      </MenuItem>
      <MenuItem
        to={URL_DICTIONARY}
        title="Dictionary"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 3}
        index={3}
      >
        <BookIcon />
      </MenuItem>
      <MenuItem
        to={URL_GAMES}
        title="Minigames"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 4}
        index={4}
      >
        <SportsEsportsIcon />
      </MenuItem>
      <MenuItem
        to={URL_STATISTICS}
        title="Statistics"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 5}
        index={5}
      >
        <EqualizerIcon />
      </MenuItem>
      <LogoutItem handlerLogout={logout} title="Log out">
        <ExitToAppIcon />
      </LogoutItem>
    </List>
  );
};
