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
    gridTemplateRows: 'max-content max-content 1fr 110px',
    gridTemplateAreas: `"games games" "paginationTop paginationTop"  "main groups" "paginationBottom paginationBottom"`,
    gridRowGap: '32px',
    gridColumnGap: '32px',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'max-content max-content max-content 1fr max-content',
      gridTemplateAreas: `"games" "groups" "paginationTop"  "main" "paginationBottom"`,
      gridRowGap: '24px',
    },
  },
  containerGridDictionary: {
    display: 'grid',
    gridTemplateColumns: '1fr 72px',
    gridTemplateRows: 'max-content max-content max-content 1fr 110px',
    gridTemplateAreas: `"games games" "topics topics" "paginationTop paginationTop" "main groups" "paginationBottom paginationBottom"`,
    gridRowGap: '32px',
    gridColumnGap: '32px',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows:
        'max-content max-content max-content max-content 1fr max-content',
      gridTemplateAreas: `"games" "topics" "groups" "paginationTop" "main" "paginationBottom"`,
      gridRowGap: '24px',
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
  topicWrapper: {
    gridArea: 'topics',
  },
  mainGrid: {
    gridArea: 'main',
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
