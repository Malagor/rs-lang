import { makeStyles } from '@material-ui/core';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';

export const useStyles = makeStyles({
  root: {
    color: COLOR_LAYOUT_BACKGROUND,
    '&:hover': {
      backgroundColor: '',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 12,
    height: 12,
    // boxShadow:
    //   'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    // backgroundColor: '#f5f8fa',
    // backgroundImage:
    //   'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    // '$root.Mui-focusVisible &': {
    //   outline: '2px auto rgba(19,124,189,.6)',
    //   outlineOffset: 2,
    // },
    // 'input:hover ~ &': {
    //   backgroundColor: '#ebf1f5',
    // },
    // 'input:disabled ~ &': {
    //   boxShadow: 'none',
    //   background: 'rgba(206,217,224,.5)',
    // },
  },
  // checkedIcon: {
  //   backgroundColor: '#137cbd',
  //   backgroundImage:
  //     'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  //   '&:before': {
  //     display: 'block',
  //     width: 16,
  //     height: 16,
  //     backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
  //     content: '""',
  //   },
  //   'input:hover ~ &': {
  //     backgroundColor: '#106ba3',
  //   },
  // },
});
