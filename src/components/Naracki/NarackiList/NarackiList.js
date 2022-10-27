import React, { useState } from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

import useStyles from './NarackiListStyles';

const formatDate = (date) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const d = new Date(date);

  return `${d.getDate()} \n ${monthNames[d.getMonth()]} \n ${d.getFullYear()}`;
};

const NarackiList = (props) => {
  const classes = useStyles();
  const { naracki, onSelectItem } = props;

  const [selectedIndex, setSelectedIndex] = useState();
  const [search, setSearch] = useState('');

  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    onSelectItem(item);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <React.Fragment>
      <form noValidate autoComplete='off'>
        <TextField
          id='filter-naracki'
          label='Пребарувај нарачки'
          fullWidth
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
      <List dense className={classes.list}>
        {naracki
          .map((item, index) => {
            return (
              <ListItem
                key={item.id}
                button
                divider
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index, item)}
                className={[
                  classes.listItem,
                  item.nova ? classes.highlight : '',
                ].join(' ')}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.user.firstName}
                    src={`/static/images/avatar/${item.id}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={item.id}
                  primary={`${item.user.firstName} ${item.user.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography variant='body2'>
                        {item.partner.ime}
                      </Typography>
                      <Typography variant='body2'>
                        Бр: {item.orderNumber}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <ListItemText
                    id={item.id}
                    secondary={formatDate(item.datum)}
                    className={classes.date}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
          .reverse()}
      </List>
    </React.Fragment>
  );
};

export default NarackiList;
