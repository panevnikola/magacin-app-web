import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginTop: 60,
  },
  incomeCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  midContainer: {
    marginTop: theme.spacing(4),
  },
}));

export default useStyles;
