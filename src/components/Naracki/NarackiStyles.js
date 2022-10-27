import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    marginTop: 60,
  },
  leftSide: {
    width: '20%',
    // maxHeight: '90vh',
    // overflow: 'auto',
  },
  rightSide: {
    width: '80%',
    marginLeft: 30
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  nemaNaracki: {
    marginTop: 30
  }
}));

export default useStyles;
