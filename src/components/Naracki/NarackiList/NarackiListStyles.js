import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    padding: 10,
    // overflow: 'auto',
  },
  listItem: {
    height: 70,
  },
  date: {
    whiteSpace: 'pre-line',
  },
  highlight: {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#c3e6d9',
    marginBottom: 10,
    border: 'none'
  },
}));

export default useStyles;
