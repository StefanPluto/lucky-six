import React from 'react';
import BallSvg from './ballSvgs/ballSvg';
import PropTypes from 'prop-types';
import BallWrapper from './ballWrapper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  '@keyframes moveToDrum': {
    '0%': {
      visibility: 'visible',
      transform: 'translate(0%, 0%) scale(0)',
    },
    '5%': {
      visibility: 'visible',
      transform: 'translate(0%, 0%) scale(0.5)',
    },
    '10%': {
      visibility: 'visible',
      transform: 'translate(-50%, 100%) scale(1)',
    },
    '14%': {
      visibility: 'visible',
      transform: 'translate(-100%, 150%) scale(1.8)',
    },
    '16%': {
      visibility: 'visible',
      transform: 'translate(-150%, 200%) scale(2.6)',
    },
    '18%': {
      visibility: 'visible',
      transform: 'translate(-200%, 250%) scale(3.4)',
    },
    '20%': {
      visibility: 'visible',
      transform: 'translate(-250%, 300%) scale(4.2)',
    },
    '22%': {
      visibility: 'visible',
      transform: 'translate(-200%, 250%) scale(5)',
    },
    '24%': {
      visibility: 'visible',
      transform: 'translate(-150%, 200%) scale(5.4)',
    },
    '26%': {
      visibility: 'visible',
      transform: 'translate(-100%, 100%) scale(6)',
    },
    '28%': {
      visibility: 'visible',
      transform: 'translate(-50%, 0%) scale(6.4)',
    },
    '30%': {
      visibility: 'visible',
      transform: 'translate(0%, -100%) scale(6.8)',
    },
    '32%': {
      visibility: 'visible',
      transform: 'translate(50%, -200%) scale(7.2)',
    },
    '34%': {
      visibility: 'visible',
      transform: 'translate(100%, -300%) scale(7.6)',
    },
    '36%': {
      visibility: 'visible',
      transform: 'translate(180%, -400%) scale(8)',
    },
    '80%': {
      visibility: 'visible',
      transform: 'translate(180%, -400%) scale(8)',
    },
    '81%': {
      visibility: 'hidden',
      transform: 'translate(180%, -400%) scale(8)',
    },
    '90%': {
      visibility: 'hidden',
      transform: 'translate(180%,-400%) scale(8)',
    },
    '91%': {
      visibility: 'hidden',
      transform: 'translate(0%, 0%) scale(0)',
    },
    '100%': {
      visibility: 'hidden',
      transform: 'translate(0%, 0%) scale(0)',
    },
  },
  root: {
    visibility: 'visible',
    position: 'relative',
    width: '100%',
    height: '100%',
    transform: 'translate(0%, 0%) scale(0)',
    animation: '$moveToDrum 2s ease-in',
  },
}));

const MainBall = ({ number, color, glowImage }) => {
  const classes = useStyles({ number, color, glowImage });
  return (
    <BallWrapper
      position={{ x: 45.5, y: 61.7 }}
      width={3.25}
      height={6.5}
      zIndex={10}
    >
      <Box key={number} className={classes.root}>
        <BallSvg color={color} number={number} />
        <img
          src={glowImage}
          style={{
            position: 'absolute',
            width: '100%',
            top: '5%',
            height: 'auto',
          }}
        />
      </Box>
    </BallWrapper>
  );
};

MainBall.propTypes = {
  width: PropTypes.number,
  position: PropTypes.object,
  number: PropTypes.number,
  color: PropTypes.string,
  glowImage: PropTypes.string,
};

export default MainBall;
