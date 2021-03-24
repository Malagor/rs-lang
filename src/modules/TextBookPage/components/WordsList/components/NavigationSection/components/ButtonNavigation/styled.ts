import styled from 'styled-components/macro';
// import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

type PropsStyleLink = {
  activePage: boolean;
};

interface StyleProps {
  backgroundColor: string;
  activePage: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: (props) => {
    if (props.activePage) {
      return {
        width: '56px',
        height: '56px',
        margin: '8px',
        border: `3px solid ${props.backgroundColor}`,

        backgroundColor: '#fafafa',
      };
    }
    return {
      width: '40px',
      height: '40px',
      margin: '12px',

      backgroundColor: props.backgroundColor,
    };
  },
  label: (props) => {
    if (props.activePage) {
      return {
        width: '40px',
        height: '40px',
        borderRadius: '50%',

        backgroundColor: props.backgroundColor,
      };
    }
    return {
      height: '100%',
    };
  },
}));

/* export const StyleLink = styled.a<PropsStyleLink>`
  display: block;
  width: 20px;
  height: 20px;
  margin: 15px;

  color: ${({ activePage }) => (activePage ? 'red' : 'black')};
`; */
