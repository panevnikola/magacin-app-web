import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './PartneriStyles';
import DelovniPartneriForm from './PartneriForm';

const Partneri = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* <Typography variant='h5' className={classes.title}>
        Деловни Партнери
      </Typography> */}
      <DelovniPartneriForm />
    </div>
  );
};

export default Partneri;
