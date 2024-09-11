import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  root: {
    opacity: '0',
    color: theme.palette.text.primary,
    fontSize: props => props.retailMode ? '8vw' : '5vw',
    webkitTextStrokeWidth: '0.04vw',
    [theme.breakpoints.down('md')]: {
      fontSize: props => props.retailMode ? '9vw' : '9vw',
      webkitTextStrokeWidth: '0.08vw',
    },
    animation: '$fadeIn 1s 1s cubic-bezier(0.15, 0.51, 0.58, 1) both',
    zIndex: '1',
  },
}));

const CountdownText = ({ currentTime, retailMode }) => {
  const classes = useStyles({retailMode});
  return <Box className={classes.root}>{currentTime / 1000}</Box>;
};

CountdownText.propTypes = {
  currentTime: PropTypes.number,
  retailMode: PropTypes.bool
};

export default CountdownText;
