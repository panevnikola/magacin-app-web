import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  card: {
    display: 'flex',
    width: '100%',
    minWidth: 275,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  listItem: {
    minWidth: 230,
    marginTop: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  date: {
    whiteSpace: 'pre-line',
  },
  icon: {
    color: 'grey',
  },
  artikliContainer: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  artikliList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

export default useStyles;
