import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: '430px',
    padding: '0 55px',
  },
  slider: {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    top: '-10px',
  },
}));
