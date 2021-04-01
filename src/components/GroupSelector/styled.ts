import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components/macro';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'sticky',
    top: '10px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '72px',
    margin: '95px auto 0',
    transition: '0.2s',

    // '&:hover': {
    //   opacity: '1',
    //   }
    // },

    [theme.breakpoints.down('xs')]: {
      position: 'none',
      top: '0',
      width: '98%',
      transform: 'none',
      margin: theme.spacing(1),
    },
  },
  groupSelectorPosition: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 10px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperWrapper: {
    padding: '5px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  titleWrapper: {
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto 0',
    },
  },
  title: {
    transform: '',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      fontWeight: 400,
      writingMode: 'vertical-lr',
      transform: 'rotate(180deg)',
    },
  },
  containerWrapper: {},
}));

type GroupSelectorWrapper = {
  isOpacity: boolean;
};

export const GroupSelectorStyled = styled.div<GroupSelectorWrapper>`
  position: sticky;
  top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 72px;
  margin: 200px auto 0;
  transition: 0.2s;
  opacity: ${({ isOpacity }) => (isOpacity ? '0.3' : '1')};

  &:hover {
    opacity: 1;
  }
  @media (max-width: 600px) {
    position: static;
    top: 0;
    width: 98%;
    transform: none;
    margin: 0;
  }
`;
