import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid #ebeced',
  },
}));

export default useStyles;
