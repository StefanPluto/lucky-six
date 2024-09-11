import React from 'react';
import BallSvg from './ballSvgs/ballSvg';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BallWrapper from './ballWrapper';

const useStyles = makeStyles(() => ({
  '@keyframes expandAnim': {
    '0%': {
      width: '0%',
      height: '0%',
    },
    '100%': {
      width: '100%',
      height: '100%',
    },
  },
  root: {
    position: 'relative',
    width: '0',
    height: '0',
    animation: '$expandAnim 0.2s 0.75s linear both',
  },
}));

const SmallBall = ({color, number, offset, glowImage, firstFive}) => {
  const classes = useStyles();
  return (
    <BallWrapper
      position={{
        y: offset.y,
        x: offset.x,
      }}
      width={firstFive ? 4 : 4.5}
      height={firstFive ? 8 : 9}
      firstFive={firstFive}
      zIndex={2}
    >
      <Box className={classes.root}>
        <BallSvg color={color} number={number} />
        <img
          src={glowImage}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '5%',
          }}
        />
      </Box>
    </BallWrapper>
  );
};

SmallBall.propTypes = {
  offset: PropTypes.object,
  number: PropTypes.number,
  color: PropTypes.string,
  glowImage: PropTypes.string,
  firstFive: PropTypes.bool
};

export default SmallBall;
