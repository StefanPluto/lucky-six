import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: '120%',
    width: '35%',
    height: '35%',
    visibility: (props) => (props.hide === false ? 'visible' : 'hidden'),
    backgroundColor: theme.palette.background.contrast,
    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
  },
}));

const Arrow = (props) => {
  const classes = useStyles(props);
  return <Box className={classes.root}></Box>;
};

export default Arrow;
