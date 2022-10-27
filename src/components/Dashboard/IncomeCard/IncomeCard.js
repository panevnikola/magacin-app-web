import React from 'react';
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import useStyles from './IncomeCardStyles';

const IncomeCard = ({
  bgColor,
  bgAfter,
  textColor,
  descriptionColor,
  avatarColor,
  value,
  description,
}) => {
  const classes = useStyles({
    bgColor,
    bgAfter,
    avatarColor,
    textColor,
    descriptionColor,
  });

  return (
    <Card className={classes.card}>
      <List className={classes.list}>
        <ListItem className={classes.list} alignItems='center' disableGutters>
          <ListItemAvatar>
            <Avatar className={classes.avatar} variant='rounded'>
              <TableChartOutlinedIcon fontSize='inherit' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.listItemText}
            primary={
              <Typography className={classes.value} variant='subtitle1'>
                {value}
              </Typography>
            }
            secondary={
              <Typography className={classes.description} variant='subtitle2'>
                {description}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
};

export default IncomeCard;
