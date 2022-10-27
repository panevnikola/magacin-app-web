import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: ({ bgColor }) => bgColor,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(2),
    borderRadius: 10,
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: ({ bgAfter }) => `linear-gradient(210.04deg, ${bgAfter} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
      borderRadius: '50%',
      top: -30,
      right: -180,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: ({ bgAfter }) => `linear-gradient(140.9deg, ${bgAfter} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
      borderRadius: '50%',
      top: -160,
      right: -130,
    },
  },
  avatar: {
    backgroundColor: ({ avatarColor }) => avatarColor,
    color: theme.palette.primary.contrastText,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0.45,
    marginBottom: 0.45,
  },
  value: {
    color: ({ textColor }) => textColor,
    fontWeight: theme.typography.fontWeightBold,
  },
  description: {
    color: ({ descriptionColor }) => descriptionColor,
    marginBottom: 1,
    opacity: 0.7,
  },
}));

export default useStyles;
