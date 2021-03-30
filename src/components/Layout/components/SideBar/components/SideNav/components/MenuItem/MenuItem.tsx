import React, { FC, SyntheticEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from 'modules/Login/selectors';
import { useStyles } from './styled';
import { COLOR_LAYOUT_GRAY } from '../../../../../../../../appConstants/colors';

type MenuItemProps = {
  to: string;
  title: string;
  handleListItemClick: (event: SyntheticEvent, index: number) => void;
  isSelected: boolean;
  index: number;
  unauthorizedAccess?: boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
  to,
  title,
  handleListItemClick,
  isSelected,
  index,
  children,
  unauthorizedAccess = false,
}) => {
  const classes = useStyles();
  const userId = useSelector(selectUserId);

  return (
    <NavLink
      to={to}
      exact={true}
      style={{ textDecoration: 'none' }}
      title={title}
    >
      <ListItem
        button
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        selected={isSelected}
        onClick={(event: SyntheticEvent) => handleListItemClick(event, index)}
      >
        <ListItemIcon className={classes.listIcon}>{children}</ListItemIcon>
        <ListItemText primary={title} className={classes.colorGray} />
        {unauthorizedAccess && !userId && (
          <LockIcon style={{ color: COLOR_LAYOUT_GRAY }} />
        )}
      </ListItem>
    </NavLink>
  );
};
