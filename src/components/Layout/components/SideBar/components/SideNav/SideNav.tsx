import React, { FC, SyntheticEvent } from 'react';
import { List } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { LogoutItem, MenuItem } from './components';

type SideNavProps = {};

const listStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const logout = () => {
  console.log('LogOut');
};

export const SideNav: FC<SideNavProps> = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event: SyntheticEvent, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List style={listStyles}>
      <MenuItem
        to="/"
        title="Главная"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 1}
        index={1}
      >
        <DashboardIcon />
      </MenuItem>

      <MenuItem
        to="/textbook"
        title="Учебник"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 2}
        index={2}
      >
        <LocalLibraryIcon />
      </MenuItem>
      <MenuItem
        to="/games"
        title="Игры"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 3}
        index={3}
      >
        <SportsEsportsIcon />
      </MenuItem>
      <MenuItem
        to="/statistics"
        title="Статистика"
        handleListItemClick={handleListItemClick}
        isSelected={selectedIndex === 4}
        index={4}
      >
        <EqualizerIcon />
      </MenuItem>
      <LogoutItem handlerLogout={logout} title="Log Out">
        <MeetingRoomIcon />
      </LogoutItem>
    </List>
  );
};