import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './PodGrupaItemStyles';

const PodGrupaItem = ({ item }) => {
  const classes = useStyles();

  return (
    <List className={classes.container}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={item.slikaUrl} />
        </ListItemAvatar>
        <ListItemText primary={item.ime} />
      </ListItem>
    </List>
  );
};

export default PodGrupaItem;
