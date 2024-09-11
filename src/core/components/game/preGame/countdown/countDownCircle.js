import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@keyframes scaleIn': {
    '0%': {
      transform: 'scale(2.3)',
      opacity: '0.2',
    },
    '100%': {
      transform: 'scale(0.6)',
      opacity: '1',
    },
  },
  '@keyframes scaleOut': {
    '0%': {
      transform: 'scale(0)',
      opacity: '1',
    },
    '100%': {
      transform: 'scale(1)',
      opacity: '0',
    },
  },
  root: {
    borderRadius: '50%',
    width: (props) => props.width,
    height: (props) => props.height,
    position: 'absolute',
    opacity: '1',
    backgroundColor: theme.palette.background.secondary,
    transform: (props) => `scale(${props.scale})`,
    '&:nth-child(1)': {
      animation: '$scaleIn 1s cubic-bezier(0.15, 0.51, 0.58, 1) both',
    },
    '&:nth-child(2)': {
      animation:
        '$scaleOut 1s 0.9s cubic-bezier(0.15, 0.51, 0.58, 1) both infinite',
    },
    '&:nth-child(3)': {
      border: `0.08vw solid ${theme.palette.background.secondary}`,
      backgroundColor: 'transparent',
      animation:
        '$scaleOut 1s 1.1s cubic-bezier(0.15, 0.51, 0.58, 1) both infinite',
    },
  },
}));

const CountDownCircle = (props) => {
  const classes = useStyles(props);
  return <Box className={classes.root} />;
};

CountDownCircle.propTypes = {
  firstFiveBalls: PropTypes.array,
  balls: PropTypes.array,
  chosen: PropTypes.bool,
};

export default CountDownCircle;
