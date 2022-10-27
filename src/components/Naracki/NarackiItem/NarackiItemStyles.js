import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ebeced',
    textAlign: 'left',
    maxWidth: '50%'
  },
  firstPart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    resize: 'contain',
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
  },
  content: {
    padding: 15,
  },
  contentLast: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
  },
}));

export default useStyles;
