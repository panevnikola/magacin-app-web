import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './GrupiStyles';
import GrupiForm from './GrupiForm';

const Grupi = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GrupiForm />
    </div>
  );
};

export default Grupi;
