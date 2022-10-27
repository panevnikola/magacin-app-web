import React, { useState, useEffect, useCallback } from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import useStyles from './DashboardStyles';
import CustomCard from './Card';
import IncomeLoadingCard from './IncomeCard/IncomeLoadingCard';
import IncomeCard from './IncomeCard/IncomeCard';
import PopularCard from './PopularCard/PopularCard';
import BarChart from './BarChart/BarChart';
import { getRequest } from '../../services/httpService';

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const getMonth = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1);

  return month;
};

const getMonthName = (date) => {
  const monthName = new Date(date).toLocaleString('default', { month: 'long' });

  return monthName;
};

const getYear = (date) => {
  let d = new Date(date),
    year = d.getFullYear();

  return year;
};

const Dashboard = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState(formatDate(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()));
  const [monthName, setMonthName] = useState(getMonthName(month));
  const [year, setYear] = useState(getYear(new Date()));
  const [naracki, setNaracki] = useState([]);
  const [filterValue, setFilterValue] = useState('month');
  const [period, setPeriod] = useState('Вкупно');
  const [userWithMostNaracki, setUserWithMostNaracki] = useState({});
  const [brojNaPartneri, setBrojNaPartneri] = useState(0);

  const { promet } = naracki;

  const status = [
    {
      value: 'today',
      label: 'Денес',
    },
    {
      value: 'month',
      label: 'Овој месец',
    },
    {
      value: 'year',
      label: 'Оваа година',
    },
    {
      value: 'alltime',
      label: 'Цело време',
    },
  ];

  useEffect(() => {
    onFetchNumberOfPartners();
  }, []);

  useEffect(() => {
    if (filterValue === 'today') {
      setPeriod('Денес');
    } else if (filterValue === 'month') {
      setPeriod(`${monthName} ${month}`);
    } else if (filterValue === 'year') {
      setPeriod(`${year}`);
    } else {
      setPeriod('Вкупно');
    }

    onFetchNaracki(month, year, today);
    onFetchUserWithMostNaracki(month, year, today);
  }, [filterValue]);

  const onChangeFilterValue = (e) => setFilterValue(e.target.value);

  const onFetchNaracki = useCallback(
    async (month, year, today) => {
      if (filterValue === 'today') {
        const result = await getRequest(`/web/naracki/count/byDay/${today}`);
        if (result.status === 200) {
          setNaracki(result.data);
        }
      } else if (filterValue === 'month') {
        const result = await getRequest(`/web/naracki/count/${month}/${year}`);
        if (result.status === 200) {
          setNaracki(result.data);
        }
      } else if (filterValue === 'year') {
        const result = await getRequest(`/web/naracki/count/byYear/${year}`);
        if (result.status === 200) {
          setNaracki(result.data);
        }
      } else {
        const result = await getRequest(`/web/naracki/count/all`);
        if (result.status === 200) {
          setNaracki(result.data);
        }
      }
    },
    [filterValue]
  );

  const onFetchUserWithMostNaracki = useCallback(
    async (month, year, today) => {
      if (filterValue === 'today') {
        const result = await getRequest(`/web/mostNaracki/day/${today}`);
        if (result.status === 200) {
          setUserWithMostNaracki(result.data[0]);
        }
      } else if (filterValue === 'month') {
        const result = await getRequest(
          `/web/mostNaracki/month/${month}/${year}`
        );
        if (result.status === 200) {
          setUserWithMostNaracki(result.data[0]);
        }
      } else if (filterValue === 'year') {
        const result = await getRequest(`/web/mostNaracki/year/${year}`);
        if (result.status === 200) {
          setUserWithMostNaracki(result.data[0]);
        }
      } else {
        const result = await getRequest(`/web/mostNaracki/all`);
        if (result.status === 200) {
          setUserWithMostNaracki(result.data[0]);
        }
      }
    },
    [filterValue]
  );

  const onFetchNumberOfPartners = useCallback(async () => {
    const result = await getRequest(`/brojNaPartneri`);
    if (result.status === 200) {
      setBrojNaPartneri(result.data[0]?.brojNaPartneri);
    }
  }, []);

  console.log('month fValue', month, filterValue, year, month, monthName);

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={6} md={4}>
          <CustomCard
            bgColor={theme.palette.secondary.dark}
            bgAfter={theme.palette.secondary[800]}
            avatarColor={theme.palette.secondary[800]}
            value={naracki.naracki || 0}
            type='Нарачки'
            description={period}
            icon='orders'
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomCard
            bgColor={theme.palette.primary.dark}
            bgAfter={theme.palette.primary[800]}
            avatarColor={theme.palette.primary[800]}
            value={brojNaPartneri || 0}
            type='Број на партнери'
            description='6 градови'
          />
        </Grid>
        <Grid className={classes.incomeCardsContainer} item xs={6} md={4}>
          {isLoading ? (
            <IncomeLoadingCard />
          ) : (
            <IncomeCard
              bgColor={theme.palette.primary.dark}
              bgAfter={theme.palette.primary[200]}
              avatarColor={theme.palette.primary[800]}
              textColor={theme.palette.primary.contrastText}
              descriptionColor={theme.palette.primary.light}
              value={`${promet} MKD`}
              description={`Вкупна сума - ${period}`}
            />
          )}
          {isLoading ? (
            <IncomeLoadingCard />
          ) : (
            <IncomeCard
              bgColor={theme.palette.orange.contrastText}
              bgAfter={theme.palette.orange.main}
              avatarColor={theme.palette.orange.main}
              textColor={theme.palette.text.primary}
              descriptionColor={theme.palette.text.secondary}
              value={`Најголем број на нарачки - ${
                userWithMostNaracki?.naracki || 0
              }`}
              description={`${userWithMostNaracki?.user?.firstName || ''} ${
                userWithMostNaracki?.user?.lastName || ''
              }`}
            />
          )}
        </Grid>
      </Grid>
      <Grid container md={12} spacing={2} className={classes.midContainer}>
        <Grid item xs={12} md={8}>
          <BarChart
            userData={naracki}
            promet={promet}
            status={status}
            onChangeFilterValue={onChangeFilterValue}
            filterValue={filterValue}
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <PopularCard
            bgColor={theme.palette.primary.dark}
            bgAfter={theme.palette.primary[200]}
            avatarColor={theme.palette.primary[800]}
            textColor={theme.palette.primary.contrastText}
            descriptionColor={theme.palette.primary.light}
            value={promet}
            description={`Вкупна сума - ${period}`}
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Dashboard;
