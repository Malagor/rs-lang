import React from 'react';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import githubLogo from 'assets/svg/github.svg';
import { AUTORS } from 'appConstants';
import { useStyles } from './styled';

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container alignItems="center">
        <Grid item xs={6} sm={6} md={3} className={classes.nameApp}>
          <ButtonBase focusRipple href="https://github.com/Malagor/travel-app">
            <Typography variant="h6">RSLang. Team 53</Typography>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} md={6} className={classes.authorsContent}>
          <Grid container className={classes.authorsWrapper}>
            {AUTORS.map((author) => (
              <Grid item xs={4} sm={2} md={4} key={author.name}>
                <ButtonBase focusRipple href={author.gitHub}>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="inherit"
                  >
                    {author.name}
                  </Typography>
                  <img
                    className={classes.gtiLogoImg}
                    src={githubLogo}
                    alt="git logo"
                  />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={6}
          md={3}
          justify="center"
          className={classes.logoSchool}
        >
          <Grid
            item
            // xs={9}
            className={classes.wrapperButton}
            style={{
              paddingRight: '16px',
            }}
          >
            <ButtonBase focusRipple href="https://rs.school/js/">
              <span
                className={classes.imageSchool}
                style={{
                  margin: '8px',
                  backgroundImage: `url('https://rs.school/images/rs_school_js.svg')`,
                }}
              />
            </ButtonBase>
            <Typography style={{ whiteSpace: 'nowrap' }}>© 2021</Typography>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};
