import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  containerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 72px',
    gridTemplateRows: '50px minmax(50px, max-content) 1fr 110px',
    gridTemplateAreas: `"paginationTop paginationTop" "games games" "main groups" "paginationBottom paginationBottom"`,
    gridGap: '32px',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows:
        'minmax(50px, max-content) 35px minmax(50px, max-content) 1fr minmax(50px, max-content)',
      gridTemplateAreas: `"groups" "paginationTop" "games" "main" "paginationBottom"`,
      gridGap: '24px',
    },
  },
  paginationTop: {
    gridArea: 'paginationTop',
  },
  paginationBottom: {
    gridArea: 'paginationBottom',
  },
  gamesWrapper: {
    gridArea: 'games',
  },

  mainGrid: {
    gridArea: 'main',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      maxWidth: 'calc(500px + 22%)',
      paddingLeft: '10%',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  sideGrid: {
    position: 'relative',
    gridArea: 'groups',
  },
  contentWrapper: {
    maxWidth: '936px',
    margin: '0 auto',
  },
}));
