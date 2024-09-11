import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@keyframes scale': {
    '0%': {
      transform: 'scale(0)',
    },
    '5%': {
      transform: 'scale(2.3)',
    },
    '88%': {
      transform: 'scale(2.3)',
    },
    '93%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(0)',
    },
  },
  root: {
    borderRadius: '50%',
    width: (props) => props.width,
    height: (props) => props.height,
    opacity: (props) => (props.opacity ? props.opacity : '0.4'),
    borderWidth: (props) => (props.borderWidth ? props.borderWidth : ''),
    borderStyle: 'solid',
    borderColor: theme.palette.background.secondary,
    filter: (props) => (props.filter ? props.filter : ''),
    backgroundColor: (props) =>
      props.backgroundColor
        ? props.backgroundColor
        : theme.palette.background.secondary,
    position: 'absolute',
    transform: 'scale(0)',
    animationName: '$scale',
    animationDuration: '8s',
    animationDelay: (props) => props.animationDelay,
    animationTimingFunction: 'cubic-bezier(0.15, 0.51, 0.58, 1)',
    animationFillMode: 'both',
  },
}));

const Circle = (props) => {
  const classes = useStyles(props);
  return <Box className={classes.root} />;
};

Circle.propTypes = {
  firstFiveBalls: PropTypes.array,
  balls: PropTypes.array,
  chosen: PropTypes.bool,
};

export default Circle;
