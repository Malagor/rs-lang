import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(263px, auto) repeat(2, minmax(277px, 300px))',
    gridTemplateRows: '124px repeat(3, auto)',
    gridGap: '32px',
    placeContent: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(277px, 300px))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(277px, 300px)',
    },
  },
}));
