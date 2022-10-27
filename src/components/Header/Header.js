import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const drawerWidth = 260;

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { openSidebar, open } = props;

  const [username, setUsername] = useState(localStorage.getItem('username'));

  const redirectToLogin = () => {
    let path = '/';
    history.replace(path);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    redirectToLogin();
    // setUsername(''); // to be deleted!
  };

  const RenderTitle = () => {
    if (location.pathname === '/naracki') {
      return (
        <Typography variant='h6' noWrap className={classes.textColor}>
          Нарачки
        </Typography>
      );
    }

    if (location.pathname === '/partneri') {
      return (
        <Typography variant='h6' noWrap className={classes.textColor}>
          Деловни Партнери
        </Typography>
      );
    }

    if (location.pathname === '/grupi') {
      return (
        <Typography variant='h6' noWrap className={classes.textColor}>
          Групи
        </Typography>
      );
    }

    if (location.pathname === '/artikli') {
      return (
        <Typography variant='h6' noWrap className={classes.textColor}>
          Артикли
        </Typography>
      );
    }

    if (location.pathname === '/home') {
      return (
        <Typography variant='h6' noWrap className={classes.textColor}>
          Dashboard
        </Typography>
      );
    }

    return (
      <Typography variant='h6' noWrap className={classes.textColor}>
        Magacin Web App
      </Typography>
    );
  };

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.toolbarLeftSide}>
          <IconButton
            aria-label='open drawer'
            onClick={openSidebar}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <RenderTitle />
        </div>
        <div className={classes.toolbarRightSide}>
          <div className={classes.username}>
            <Typography
              variant='subtitle1'
              noWrap
              className={classes.textColor}
            >
              Hello {username}
            </Typography>
          </div>
          <Button type='button' fullWidth variant='outlined' onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.primary.contrastText,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarLeftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  textColor: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  toolbarRightSide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    marginRight: 20,
  },
}));

export default Header;
