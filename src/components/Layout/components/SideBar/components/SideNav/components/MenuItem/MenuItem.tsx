import React, { FC, SyntheticEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import { useStyles } from './styled';

type MenuItemProps = {
  to: string;
  title: string;
  handleListItemClick: (event: SyntheticEvent, index: number) => void;
  isSelected: boolean;
  index: number;
};

export const MenuItem: FC<MenuItemProps> = ({
  to,
  title,
  handleListItemClick,
  isSelected,
  index,
  children,
}) => {
  const classes = useStyles();

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
      </ListItem>
    </NavLink>
  );
};
