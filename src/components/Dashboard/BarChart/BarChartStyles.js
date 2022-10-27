import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    border: (props) => (props.border ? '1px solid' : 'none'),
    borderColor: theme.palette.primary[200] + 75,
    ':hover': {
      boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    },
    borderRadius: 10,
  },
  cardHeader: {
    marginRight: 0,
  },
  headTitle: {
    color: theme.palette.text.secondary,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  select: {
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
}));

export default useStyles;
