import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: 70,
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(10),
    margin: theme.spacing(10),
    width: '70%',
  },
  inputField: {
    marginBottom: theme.spacing(3),
  },
  buttonSave: {
    marginTop: theme.spacing(2),
  },
  buttonCancel: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    // display: 'flex',
    // justifyContent: 'space-between',
  },
  spinner: {
    marginLeft: 160,
  },
  image: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  podgrupi: {
    flexGrow: 1,
    width: '70%',
  },
  podgrupiList: {
    marginBlock: 20,
  },
}));

export default useStyles;
