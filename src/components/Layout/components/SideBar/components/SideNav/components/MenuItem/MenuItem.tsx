import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { useStyles } from './styled';

type MenuItemProps = {
  to: string;
  title: string;
  showNotAuthorized?: boolean;
  setMarkerTop?: React.Dispatch<React.SetStateAction<number>>;
};

export const MenuItem: FC<MenuItemProps> = ({
  to,
  title,
  children,
  showNotAuthorized = true,
}) => {
  const userId = useSelector(selectUserId);
  const isSelected = useRouteMatch({ path: to, exact: true });
  const classes = useStyles();

  return (
    <NavLink
      to={to}
      exact={true}
      style={{
        textDecoration: 'none',
        opacity: !showNotAuthorized && !userId ? '0.5' : '1',
      }}
      title={title}
    >
      <ListItem
        button
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        selected={!!isSelected}
      >
        <ListItemIcon className={classes.listIcon}>{children}</ListItemIcon>
        <ListItemText primary={title} className={classes.colorGray} />
        {!showNotAuthorized && !userId && (
          <LockIcon style={{ color: COLOR_LAYOUT_GRAY }} />
        )}
      </ListItem>
    </NavLink>
  );
};
