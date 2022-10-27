import React from 'react';

import useStyles from './ArtikliStyles';
import ArtikliForm from './ArtikliForm';

const Artikli = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ArtikliForm />
    </div>
  );
};

export default Artikli;
