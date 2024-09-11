import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Circle from './circle';
import TextContainer from './textContainer';

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

const GameTextAnimation = ({ currentGameIndex, retailMode }) => {
  const classes = useStyles();
  return currentGameIndex !== -1 ? (
    <Box className={classes.root} key={currentGameIndex}>
      <Circle
        animationDelay={'0s'}
        width={'36%'}
        height={'64%'}
        opacity={'0.2'}
      />
      <Circle animationDelay={'0.08s'} width={'31.84%'} height={'55.68%'} />
      <Circle
        animationDelay={'0.16s'}
        width={'37.44%'}
        height={'66.88%'}
        borderWidth={'0.1vw'}
        backgroundColor={'transparent'}
      />
      <Circle
        animationDelay={'0.24s'}
        width={'36.704%'}
        height={'65.408%'}
        borderWidth={'0.05vw'}
        backgroundColor={'transparent'}
      />
      <Circle
        animationDelay={'0.32s'}
        width={'36.56%'}
        height={'65.12%'}
        borderWidth={'0.05vw'}
        backgroundColor={'transparent'}
      />
      <Circle
        animationDelay={'0.4s'}
        width={'36.288%'}
        height={'64.576%'}
        borderWidth={'0.1vw'}
        backgroundColor={'transparent'}
        filter={'blur(0.05vw)'}
      />
      <Circle
        animationDelay={'0.48s'}
        width={'36%'}
        height={'64%'}
        borderWidth={'0.4vw'}
        backgroundColor={'transparent'}
        filter={'blur(0.1vw)'}
      />
      <TextContainer currentGameIndex={currentGameIndex} retailMode={retailMode} />
    </Box>
  ) : (
    ''
  );
};

GameTextAnimation.propTypes = {
  currentGameIndex: PropTypes.number,
  retailMode: PropTypes.bool
};

export default GameTextAnimation;
