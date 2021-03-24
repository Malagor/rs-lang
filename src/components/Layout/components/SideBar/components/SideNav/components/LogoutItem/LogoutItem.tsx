import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './styled';

type MenuItemProps = {
  title: string;
  handlerLogout: () => void;
};

export const LogoutItem: FC<MenuItemProps> = ({
  title,
  handlerLogout,
  children,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      classes={{
        root: classes.root,
      }}
      onClick={handlerLogout}
    >
      <ListItemIcon className={classes.listIcon}>{children}</ListItemIcon>
      <ListItemText primary={title} className={classes.colorGray} />
    </ListItem>
  );
};
