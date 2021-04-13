import styled from 'styled-components/macro';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 240px;
  width: 100%;
`;

export const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
}));

export const iconStyles = {
  fontSize: '2rem',
  cursor: 'pointer',
  margin: '8px 0 0 5px',
};
