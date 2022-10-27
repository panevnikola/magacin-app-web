import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Auth/Login/Login';

const Naracki = React.lazy(() => {
  return import('./components/Naracki/Naracki');
});

const Partneri = React.lazy(() => {
  return import('./components/Partneri/Partneri');
});

const PartnerCreate = React.lazy(() => {
  return import('./components/Partneri/PartnerCreate/PartnerCreate');
});

const Grupi = React.lazy(() => {
  return import('./components/Grupi/Grupi');
});

const GrupaCreate = React.lazy(() => {
  return import('./components/Grupi/GrupaCreate/GrupaCreate');
});

const Artikli = React.lazy(() => {
  return import('./components/Artikli/Artikli');
});

const ArtikalCreate = React.lazy(() => {
  return import('./components/Artikli/ArtikalCreate/ArtikalCreate');
});

const Dashboard = React.lazy(() => {
  return import('./components/Dashboard/Dashboard');
});

const drawerWidth = 240;

const socket = io('http://localhost:8080', { transports: ['websocket'] });

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const minWidthForSidebar = useMediaQuery('(min-width:800px)');

  let routes = null;
  let isAuth = localStorage.getItem('token') !== null;

  const [showNotificationButton, setShowNotificationButton] = useState(false);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('socket conn ', socket.connected);
    });

    socket.on('createNaracka', (arg) => {
      console.log('createNaracka arg', arg);
    });
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      console.log('notifications enabled');
      setShowNotificationButton(true);
    }
  }, []);

  const askForNotificationPermission = () => {
    Notification.requestPermission((result) => {
      console.log('user choice ', result);
      if (result !== 'granted') {
        console.log('No permission granted!');
      } else {
        console.log('else');
        displayConfirmNotification();
      }
    });
  };

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      let options = {
        body: 'You successfully subscribed to our Notification service',
      };

      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification('Successfully subscribed!', options);
      });
    }
  };

  const handleSidebarOpen = () => {
    console.log('handleSidebarOpen', open);
    setOpen(true);
    socket.emit('chat', {
      message: 'Drawer chat closed',
    });
  };

  socket.on('chat', function (data) {
    console.log('chat on data', data);
  });

  const handleSidebarClose = () => {
    console.log('handleSidebarClose', open);
    setOpen(false);
  };

  routes = (
    <Switch>
      <Route path='/home' render={(props) => <Dashboard {...props} />}></Route>
      <Route path='/naracki' render={(props) => <Naracki {...props} />}></Route>
      <Route
        path='/partneri/create'
        render={(props) => <PartnerCreate {...props} />}
      ></Route>
      <Route
        path='/partneri'
        render={(props) => <Partneri {...props} />}
      ></Route>
      <Route
        path='/grupi/create'
        render={(props) => <GrupaCreate {...props} />}
      ></Route>
      <Route path='/grupi' render={(props) => <Grupi {...props} />}></Route>
      <Route
        path='/artikli/create'
        render={(props) => <ArtikalCreate {...props} />}
      ></Route>
      <Route path='/artikli' render={(props) => <Artikli {...props} />}></Route>
      <Redirect to='/naracki' />
    </Switch>
  );

  return isAuth ? (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawerHeader} />
      {isAuth && (
        <Header
          openSidebar={handleSidebarOpen}
          closeSidebar={handleSidebarClose}
          open={open}
        />
      )}
      {isAuth && minWidthForSidebar && (
        <Sidebar
          openSidebar={handleSidebarOpen}
          closeSidebar={handleSidebarClose}
          open={open}
          showNotificationButton={showNotificationButton}
          askForNotificationPermission={askForNotificationPermission}
          displayConfirmNotification={displayConfirmNotification}
        />
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </main>
    </div>
  ) : (
    <Login />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default withRouter(App);
