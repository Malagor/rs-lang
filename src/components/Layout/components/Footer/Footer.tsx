import React from 'react';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import schoolLogo from 'assets/svg/rs_school_js.svg';
import { AUTHORS } from 'appConstants';
import { useStyles } from './styled';

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <ButtonBase
        focusRipple
        href="https://rs.school/react/"
        className={classes.imageSchool}
      >
        <img src={schoolLogo} alt="RS School" />
      </ButtonBase>
      <Grid container alignItems="center" className={classes.authors}>
        {AUTHORS.map((author) => (
          <Grid item key={author.name}>
            <ButtonBase
              focusRipple
              href={author.gitHub}
              className={classes.gitHubLink}
            >
              <Typography
                component="span"
                variant="subtitle2"
                color="inherit"
                style={{ fontWeight: 400 }}
              >
                {author.name}
              </Typography>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Grid item className={classes.copyright}>
        <Typography style={{ whiteSpace: 'nowrap' }}>© 2021</Typography>
      </Grid>
    </footer>
  );
};
