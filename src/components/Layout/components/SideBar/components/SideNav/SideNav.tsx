import React, { FC } from 'react';
import { List } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useDispatch, useSelector } from 'react-redux';
import {
  URL_MAIN_PAGE,
  URL_TEXT_BOOK,
  URL_DICTIONARY,
  URL_GAMES,
  URL_STATISTICS,
} from 'appConstants/url';
import { logOutUser } from 'modules/Login/actions';
import { selectUserId } from 'modules/Login/selectors';
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
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOutUser());
  };

  return (
    <List style={listStyles}>
      <MenuItem to={URL_MAIN_PAGE} title="Main">
        <DashboardIcon />
      </MenuItem>
      <MenuItem to={URL_TEXT_BOOK} title="Textbook">
        <LocalLibraryIcon />
      </MenuItem>
      {userId && (
        <MenuItem to={URL_DICTIONARY} title="Dictionary">
          <BookIcon />
        </MenuItem>
      )}
      <MenuItem to={URL_GAMES} title="Minigames">
        <SportsEsportsIcon />
      </MenuItem>
      <MenuItem
        to="/games/savannah"
        title="Savannah Game"
      >
        <SportsEsportsIcon />
      </MenuItem>
      <MenuItem to={URL_STATISTICS} title="Statistics">
        <EqualizerIcon />
      </MenuItem>
      <LogoutItem handlerLogout={logout} title="Log out">
        <ExitToAppIcon />
      </LogoutItem>
    </List>
  );
};
