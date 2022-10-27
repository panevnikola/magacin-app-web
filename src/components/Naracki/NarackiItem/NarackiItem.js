import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './NarackiItemStyles';

const NarackiItem = (props) => {
  const classes = useStyles();

  const { item } = props;

  return (
    <div className={classes.row}>
      <div className={classes.firstPart}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={item.artikal.slikaUrl} alt='' />
        </div>
        <div className={classes.content}>
          <Typography variant='subtitle2'>{item.artikal.ime}</Typography>
          <Typography variant='body2' style={{color: 'grey'}}>{item.artikal.opis}</Typography>
          <Typography variant='body2' style={{color: 'grey'}}>{item.artikal.grupa}</Typography>
        </div>
      </div>
      <div className={classes.lastPart}>
        <div className={classes.contentLast}>
          <Typography variant='body2'><span style={{color: 'grey'}}>Количина: </span>{item.kolicina}</Typography>
          <Typography variant='body2'><span style={{color: 'grey'}}>Цена: </span>{item.artikal.cena} MKD</Typography>
        </div>
      </div>
    </div>
  );
};

export default NarackiItem;
