import React, { MouseEvent, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsButtons,
  selectIsTranslate,
} from 'modules/TextBookPage/selectors';
import { setIsButtons, setIsTranslate } from 'modules/TextBookPage/actions';

export const TextBookSettings: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const isTranslate = useSelector(selectIsTranslate);
  const isButtons = useSelector(selectIsButtons);
  const dispatch = useDispatch();

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtons = () => {
    setAnchorEl(null);
    dispatch(setIsButtons(!isButtons));
  };

  const handleTranslation = () => {
    setAnchorEl(null);
    dispatch(setIsTranslate(!isTranslate));
  };

  const iconStyles = {
    fontSize: '2rem',
    cursor: 'pointer',
    margin: '8px 0 0 5px',
  };

  return (
    <div>
      <SettingsIcon
        style={iconStyles}
        titleAccess="Settings"
        onClick={handleClick}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleButtons}>{`${
          isButtons ? 'Hide' : 'Show'
        } buttons`}</MenuItem>
        <MenuItem onClick={handleTranslation}>{`${
          isTranslate ? 'Hide' : 'Show'
        } translation`}</MenuItem>
      </Menu>
    </div>
  );
};
