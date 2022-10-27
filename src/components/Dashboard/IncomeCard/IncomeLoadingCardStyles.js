import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    padding: 2,
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
      borderRadius: '50%',
      top: -30,
      right: -180,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
      borderRadius: '50%',
      top: -160,
      right: -130,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default useStyles;
