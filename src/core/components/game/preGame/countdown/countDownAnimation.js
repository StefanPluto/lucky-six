import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CountDownCircle from './countDownCircle';
import CountDownText from './countdownText';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const CountdownAnimation = ({ currentTime, retailMode }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CountDownCircle width={'36%'} height={'64%'} scale={'2.3'} />
      <CountDownCircle width={'36%'} height={'64%'} scale={'0'} />
      <CountDownCircle width={'52%'} height={'96%'} scale={'0'} />
      <CountDownText currentTime={currentTime} retailMode={retailMode}/>
    </Box>
  );
};

CountdownAnimation.propTypes = {
  currentTime: PropTypes.number,
  retailMode: PropTypes.bool
};

export default CountdownAnimation;
