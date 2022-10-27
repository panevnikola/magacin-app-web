import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';

const drawerWidth = 260;

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();

  const {
    closeSidebar,
    open,
    showNotificationButton,
    askForNotificationPermission,
  } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant='h6'>
          Magacin Web App
        </Typography>
        <IconButton onClick={closeSidebar}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon className={classes.icon} />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <NavLink to='/home' className={classes.link}>
          <ListItem
            button
            key={1}
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={location.pathname === '/home'}
          >
            <ListItemIcon>
              <DashboardIcon
                color={location.pathname === `/home` ? `secondary` : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary='Home'
              secondary='Dashboard'
              classes={{
                primary:
                  location.pathname === `/home`
                    ? classes.listItemTextActive
                    : null,
              }}
            />
          </ListItem>
        </NavLink>
        <br />
        <Divider style={{ width: '90%', margin: 'auto' }} />
        <br />
        <NavLink to='/naracki' className={classes.link}>
          <ListItem
            button
            key={1}
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={location.pathname === '/naracki'}
          >
            <ListItemIcon>
              <ListAltIcon
                color={location.pathname === `/naracki` ? `secondary` : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary='Нарачки'
              classes={{
                primary:
                  location.pathname === `/naracki`
                    ? classes.listItemTextActive
                    : null,
              }}
            />
          </ListItem>
        </NavLink>
        <NavLink to='/partneri' className={classes.link}>
          <ListItem
            button
            key={1}
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={location.pathname === '/partneri'}
          >
            <ListItemIcon>
              <GroupIcon
                color={location.pathname === `/partneri` ? `secondary` : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary='Партнери'
              classes={{
                primary:
                  location.pathname === `/partneri`
                    ? classes.listItemTextActive
                    : null,
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink to='/grupi' className={classes.link}>
          <ListItem
            button
            key={1}
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={location.pathname === '/grupi'}
          >
            <ListItemIcon>
              <GroupWorkIcon
                color={location.pathname === `/grupi` ? `secondary` : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary='Групи'
              classes={{
                primary:
                  location.pathname === `/grupi`
                    ? classes.listItemTextActive
                    : null,
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink to='/artikli' className={classes.link}>
          <ListItem
            button
            key={1}
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={location.pathname === '/artikli'}
          >
            <ListItemIcon>
              <LibraryBooksIcon
                color={location.pathname === `/artikli` ? `secondary` : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary='Артикли'
              classes={{
                primary:
                  location.pathname === `/artikli`
                    ? classes.listItemTextActive
                    : null,
              }}
            />
          </ListItem>
        </NavLink>
      </List>
      {!showNotificationButton && (
        <div className={classes.btnContainer}>
          <Button
            style={{ backgroundColor: 'white' }}
            color='primary'
            type='button'
            fullWidth
            onClick={askForNotificationPermission}
          >
            Enable notifications
          </Button>
        </div>
      )}
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.contrastText,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  listItem: {
    width: '90%',
    margin: 'auto',
    '&$selected': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 10,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 10,
    },
  },
  selected: {},
  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  listItemTextActive: {
    fontWeight: theme.typography.subtitle1.fontWeight,
  },
  btnContainer: {
    marginTop: 5,
    marginRight: 15,
    marginLeft: 15,
  },
}));

export default Sidebar;
