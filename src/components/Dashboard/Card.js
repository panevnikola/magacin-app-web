import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';

import useStyles from './CardStyles';

const CustomCard = ({
  bgColor,
  bgAfter,
  value,
  type,
  description,
  avatarColor,
  icon = 'people'
}) => {
  const classes = useStyles({ bgColor, bgAfter, avatarColor });

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <div className={classes.cardHeader}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} variant='rounded'>
                {icon === 'people' ? (
                  <PeopleIcon fontSize='inherit' />
                ) : (
                  <AssignmentIcon fontSize='inherit' />
                )}
              </Avatar>
            </ListItemAvatar>
            <Typography variant='h4' className={classes.value}>
              {value}
            </Typography>
          </div>
        }
      />
      <CardContent>
        <Typography variant='h5' className={classes.type}>
          {type}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
