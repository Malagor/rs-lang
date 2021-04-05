import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    marginBottom: `${theme.spacing(7)}px`,
    gridTemplateColumns: 'minmax(263px, auto) repeat(2, minmax(277px, 300px))',
    gridTemplateRows: '124px repeat(3, auto)',
    gridGap: '32px',
    placeContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(277px, 300px))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(277px, 300px)',
    },
  },
}));
