import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@keyframes scale': {
    '8%': {
      transform: 'scale(0, 1)',
    },
    '13%': {
      transform: 'scale(1, 1)',
    },
    '85%': {
      transform: 'scale(1, 1)',
    },
    '88%': {
      transform: 'scale(0, 1)',
    },
    '100%': {
      transform: 'scale(0, 1)',
    },
  },
  root: {
    width: '50%',
    height: '0.4%',
    margin: '2% 0 2% 0',
    backgroundColor: theme.palette.background.primary,
    transform: 'scale(0, 1)',
    transformOrigin: (props) => `${props.startingPosition} center`,
    animation: '$scale 8s infinite linear both',
  },
}));

const TextBorder = (props) => {
  const classes = useStyles(props);
  return <Box className={classes.root} />;
};

TextBorder.propTypes = {
  firstFiveBalls: PropTypes.array,
  balls: PropTypes.array,
  chosen: PropTypes.bool,
};

export default TextBorder;
