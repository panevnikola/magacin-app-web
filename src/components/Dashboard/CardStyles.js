import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: ({ bgColor }) => bgColor,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(1),
    borderRadius: 10,
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: ({ bgAfter }) => bgAfter,
      borderRadius: '50%',
      top: -85,
      right: -95,
      [theme.breakpoints.down('sm')]: {
        top: -105,
        right: -140,
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: ({ bgAfter }) => bgAfter,
      borderRadius: '50%',
      top: -125,
      right: -15,
      opacity: 0.5,
      [theme.breakpoints.down('sm')]: {
        top: -155,
        right: -70,
      },
    },
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  value: {
    fontSize: 38,
    fontWeight: theme.typography.fontWeightBold,
  },
  type: {
    fontWeight: theme.typography.fontWeightBold,
  },
  description: {
    opacity: 0.8,
  },
  avatar: {
    backgroundColor: ({ avatarColor }) => avatarColor,
    color: theme.palette.primary.contrastText,
  },
}));

export default useStyles;
