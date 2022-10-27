import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 60,
  },
  card: {
    width: '100%',
    overflow: 'auto',
    marginTop: theme.spacing(3),
  },
  searchContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    cursor: 'pointer',
  },
  image: {
    width: 60,
    height: 60,
    resize: 'contain',
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
  },
}));

export default useStyles;
