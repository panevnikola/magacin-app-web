import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './NarackiStyles';
import { getRequest, putRequest } from '../../services/httpService';
import NarackiList from './NarackiList/NarackiList';
import NarackiDetails from './NarackiDetails/NarackiDetails';

const socket = io('http://localhost:8080', { transports: ['websocket'] });

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const Naracki = (props) => {
  const classes = useStyles();

  const [naracki, setNaracki] = useState([]);
  const [allNaracki, setAllNaracki] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [itemsByNumber, setItemsByNumber] = useState([]);
  const [datum, setDatum] = useState(formatDate(new Date()));

  useEffect(() => {
    onFetchNaracki(datum);
  }, []);

  useEffect(() => {
    socket.on('createNaracka', (arg) => {
      console.log('createNaracka arg', arg);
      onFetchNaracki(datum);
    });
  }, []);

  const onFetchNaracki = useCallback(async (date) => {
    console.log('onFetch Naracki date ', date);
    const result = await getRequest(`/web/naracki/${date}`);

    if (result.status === 200) {
      const uniqueOrders = [];
      const map = new Map();
      for (const item of result.data) {
        if (!map.has(item.orderNumber)) {
          map.set(item.orderNumber, true); // set any value to Map
          uniqueOrders.push({
            ...item,
          });
        }
      }
      setNaracki(uniqueOrders);
      setAllNaracki(result.data);
    }
  }, []);

  const onSelect = (item) => {
    item.nova = 0;
    const itemsByOrderNumber = allNaracki.filter(
      (i) => item.orderNumber === i.orderNumber
    );
    setItemsByNumber(itemsByOrderNumber);
    setSelectedItem(item);
    onUpdateNaracka('/naracki/', { nova: item.nova }, item.orderNumber);
    window.scrollTo(0, 0);
  };

  const onEndNaracka = () => {
    selectedItem.status = 'Ready for pick up';
    setSelectedItem({ ...selectedItem, status: 'Ready for pick up' });
    console.log('selectedItem ', selectedItem);
    onUpdateNaracka(
      '/naracki/',
      { status: selectedItem.status },
      selectedItem.orderNumber
    );
    window.scrollTo(0, 0);
  };

  const onUpdateNaracka = async (path, body, params) => {
    const result = await putRequest(path, body, params);

    if (result.status === 200 || result.statusText === 'OK') {
      console.log('result status text', result.statusText);
    }
  };

  const onChangeDatum = (date) => {
    setDatum(formatDate(date));
    onFetchNaracki(formatDate(date));
    setSelectedItem();
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div className={classes.dateContainer}>
          {/* <Typography variant='h5'>Нарачки</Typography> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              fullWidth
              margin='none'
              id='datum'
              label='Datum'
              inputVariant='standard'
              type='text'
              autoOk={true}
              value={datum}
              format='MMM dd, yyyy'
              onChange={(date) => onChangeDatum(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        {naracki.length > 0 ? (
          <NarackiList
            naracki={naracki}
            onSelectItem={(item) => onSelect(item)}
          />
        ) : (
          <div className={classes.nemaNaracki}>
            <Typography variant='h6'>Не се пронајдени нарачки</Typography>
          </div>
        )}
      </div>
      <div className={classes.rightSide}>
        {naracki.length > 0 && selectedItem && (
          <NarackiDetails
            selectedItem={selectedItem}
            itemsByNumber={itemsByNumber}
            onEndNaracka={onEndNaracka}
          />
        )}
      </div>
    </div>
  );
};

export default Naracki;
