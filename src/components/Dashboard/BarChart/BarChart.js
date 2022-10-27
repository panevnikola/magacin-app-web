import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';
import Chart from 'react-apexcharts';

import useStyles from './BarChartStyles';
import { chartData } from './chartData';

const omit = (obj, ...props) => {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
};

const BarChart = ({
  userData,
  status,
  onChangeFilterValue,
  filterValue,
  promet,
}) => {
  const classes = useStyles();
  const usData = omit(userData, 'naracki', 'promet');

  const usersNames = Object.keys(usData);
  const usersValues = Object.values(usData);

  const data = chartData(usersNames, usersValues);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container className={classes.top}>
              <Grid item>
                <Grid container direction='column' spacing={1}>
                  <Grid item>
                    <Typography variant='h6' className={classes.headTitle}>
                      Промет од нарачки
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h5'>{promet} MKD</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.select}
                  select
                  value={filterValue}
                  onChange={(e) => onChangeFilterValue(e)}
                  variant='outlined'
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Chart {...data} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BarChart;
