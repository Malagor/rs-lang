import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const authors = [
  {
    name: 'Malagor',
    gitHub: 'https://github.com/Malagor',
  },
  {
    name: 'Femiarkh',
    gitHub: 'https://github.com/femiarkh',
  },
  {
    name: 'Liza-Veis',
    gitHub: 'https://github.com/Liza-Veis',
  },
  {
    name: 'Andrei107Q',
    gitHub: 'https://github.com/Andrei107Q',
  },
];

const useStyles = makeStyles((theme) => ({
  footer: {
    // padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  wrapperContent: {},
  nameApp: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      order: '1',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      order: '1',
    },
  },
  authorsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      order: '3',
      marginTop: theme.spacing(1),
    },
  },
  logoSchool: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      order: '2',
    },
  },
  imageSchool: {
    width: '55px',
    height: '20px ',
    backgroundRepeat: 'no-repeat',
  },
  gtiLogoImg: {
    width: '12px',
    margin: '3px',
  },
  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      footer
      {/* <Grid */}
      {/*  container */}
      {/*  direction="row" */}
      {/*  justify="center" */}
      {/*  alignItems="center" */}
      {/*  className={classes.wrapperContent} */}
      {/*  spacing={3} */}
      {/* > */}
      {/*  <Grid item xs={12} sm={7} md={2} className={classes.nameApp}> */}
      {/*    <ButtonBase focusRipple href="https://github.com/Malagor/travel-app"> */}
      {/*      <Typography variant="h6">Go-Go Travel</Typography> */}
      {/*    </ButtonBase> */}
      {/*  </Grid> */}
      {/*  <Grid item xs={12} md={7} className={classes.authorsContent}> */}
      {/*    <Grid container justify="center" spacing={3}> */}
      {/*      {authors.map((author) => ( */}
      {/*        <Grid item xs={6} sm={3} key={author.name}> */}
      {/*          <ButtonBase focusRipple href={author.gitHub}> */}
      {/*            <span> */}
      {/*              <Typography */}
      {/*                component="span" */}
      {/*                variant="subtitle2" */}
      {/*                color="inherit" */}
      {/*              > */}
      {/*                {author.name} */}
      {/*              </Typography> */}
      {/*            </span> */}
      {/*            <img */}
      {/*              className={classes.gtiLogoImg} */}
      {/*              src={gitLogo} */}
      {/*              alt="git logo" */}
      {/*            /> */}
      {/*          </ButtonBase> */}
      {/*        </Grid> */}
      {/*      ))} */}
      {/*    </Grid> */}
      {/*  </Grid> */}
      {/*  <Grid */}
      {/*    item */}
      {/*    container */}
      {/*    xs={8} */}
      {/*    sm={5} */}
      {/*    md={3} */}
      {/*    justify="center" */}
      {/*    className={classes.logoSchool} */}
      {/*  > */}
      {/*    <Grid */}
      {/*      item */}
      {/*      xs={9} */}
      {/*      className={classes.wrapperButton} */}
      {/*      style={{ */}
      {/*        paddingRight: '16px', */}
      {/*      }} */}
      {/*    > */}
      {/*      <ButtonBase focusRipple href="https://rs.school/js/"> */}
      {/*        <span */}
      {/*          className={classes.imageSchool} */}
      {/*          style={{ */}
      {/*            margin: '8px', */}
      {/*            backgroundImage: `url('https://rs.school/images/rs_school_js.svg')`, */}
      {/*          }} */}
      {/*        /> */}
      {/*      </ButtonBase> */}
      {/*      <Typography style={{ whiteSpace: 'nowrap' }}>© 2021</Typography> */}
      {/*    </Grid> */}
      {/*  </Grid> */}
      {/* </Grid> */}
    </footer>
  );
};
