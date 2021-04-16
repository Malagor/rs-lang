import styled from 'styled-components/macro';
import {
  COLOR_LAYOUT_BACKGROUND_RGB,
  COLOR_LAYOUT_BACKGROUND,
} from 'appConstants/colors';
import { makeStyles } from '@material-ui/core';

export const AnswersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    color: `${COLOR_LAYOUT_BACKGROUND}`,
    padding: '8px 20px',
    cursor: 'pointer',
    transition: '0.3s',
    margin: 0,

    '&:hover': {
      backgroundColor: `rgba(${COLOR_LAYOUT_BACKGROUND_RGB}, 0.3)`,
    },
  },
  disabled: {
    color: `${COLOR_LAYOUT_BACKGROUND} !important`,
  },
});
