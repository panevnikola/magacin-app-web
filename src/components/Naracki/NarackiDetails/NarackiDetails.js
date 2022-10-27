import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EmojiTransportationOutlinedIcon from '@material-ui/icons/EmojiTransportationOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './NarackiDetailsStyles';
import NarackiItem from '../NarackiItem/NarackiItem';

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

const NarackiDetails = (props) => {
  const classes = useStyles();

  const { selectedItem, itemsByNumber, onEndNaracka } = props;

  const { partner, datum, orderNumber, status, user } = selectedItem;

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textPrimary'
              gutterBottom
            >
              Информации за нарачка број {orderNumber}
            </Typography>
          </CardContent>
          {status !== 'Ready for pick up' ? (
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                type='button'
                onClick={onEndNaracka}
                style={{ marginRight: 15 }}
                endIcon={<DoneIcon />}
              >
                Затвори нарачка
              </Button>
            </CardActions>
          ) : <div></div>}
        </Card>
      </div>
      <List dense className={classes.list}>
        <ListItem key={1} className={classes.listItem}>
          <ListItemText
            id={'1-partner'}
            primary={partner.ime}
            secondary={`Партнер`}
          />
          <ListItemSecondaryAction>
            <EmojiTransportationOutlinedIcon className={classes.icon} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem key={2} className={classes.listItem}>
          <ListItemText
            id={'2-datumNaNaracka'}
            primary={formatDate(datum)}
            secondary={`Датум`}
          />
          <ListItemSecondaryAction>
            <CalendarTodayOutlinedIcon className={classes.icon} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem key={3} className={classes.listItem}>
          <ListItemText
            id={'3-magacioner'}
            primary={`${user.firstName} ${user.lastName}`}
            secondary={`Дистрибутер`}
          />
          <ListItemSecondaryAction>
            <PersonOutlineOutlinedIcon className={classes.icon} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem key={4} className={classes.listItem}>
          <ListItemText
            id={'4-orderNumber'}
            primary={orderNumber}
            secondary={`Број на нарачка`}
          />
          <ListItemSecondaryAction>
            <FeaturedPlayListOutlinedIcon className={classes.icon} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem key={4} className={classes.listItem}>
          <ListItemText id={'5-status'} primary={status} secondary={`Статус`} />
          <ListItemSecondaryAction>
            {status !== 'Waiting' ? (
              <CheckBoxSharpIcon className={classes.icon} />
            ) : (
              <CheckBoxOutlineBlankSharpIcon className={classes.icon} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <div className={classes.infoContainer}>
        <Typography style={{ color: 'grey', marginBottom: 10 }}>
          Артикли
        </Typography>
        <Typography style={{ color: 'grey', marginBottom: 10 }}>
          {partner.ime}
        </Typography>
      </div>
      <Card className={classes.artikliContainer}>
        <div className={classes.artikliList}>
          {itemsByNumber &&
            itemsByNumber.map((item) => <NarackiItem item={item} />)}
        </div>

        <List dense>
          <ListItem key={'5adresa'}>
            <ListItemText
              id={'1-partnerAdresa'}
              primary={partner.adresa}
              secondary={`Адреса`}
            />
            <ListItemSecondaryAction>
              <HomeOutlinedIcon />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key={'6partnerTel'}>
            <ListItemText
              id={'1-partnerTel'}
              primary={partner.telefonskiBroj}
              secondary={`Телефонски број`}
            />
            <ListItemSecondaryAction>
              <PhoneOutlinedIcon />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default NarackiDetails;
