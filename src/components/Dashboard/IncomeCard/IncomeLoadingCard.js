import React from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from './IncomeLoadingCardStyles';

const IncomeLoadingCard = ({ bgColor, bgAfter, value, type, description }) => {
  const classes = useStyles({ bgColor, bgAfter });

  return (
    <Card className={classes.card}>
      <List className={classes.list}>
        <ListItem
          className={classes.list}
          alignItems='center'
          disableGutters
        >
          <ListItemAvatar>
            <Skeleton variant='rectangular' width={44} height={44} />
          </ListItemAvatar>
          <ListItemText
            className={classes.list}
            primary={<Skeleton variant='rectangular' height={20} />}
            secondary={<Skeleton variant='text' />}
          />
        </ListItem>
      </List>
    </Card>
  );
};

export default IncomeLoadingCard;
