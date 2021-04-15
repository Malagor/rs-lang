import styled from 'styled-components/macro';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_BLUE, COLOR_LAYOUT_DARKBLUE } from 'appConstants/colors';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px',
    },
  },
}));

export const iconStyles = {
  martginBottom: '-2px',
  fontSize: '2rem',
  cursor: 'pointer',
  marginLeft: '16px',
  color: COLOR_LAYOUT_DARKBLUE,
  transition: 'color 200ms ease',
  ':hover': {
    color: COLOR_LAYOUT_BLUE,
  },
};
