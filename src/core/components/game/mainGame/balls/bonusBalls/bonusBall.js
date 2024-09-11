import React from 'react';
import PropTypes from 'prop-types';
import BallWrapper from '../ballWrapper';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import BonusBallSvg from '../ballSvgs/bonusBallSvg';

const useStyles = makeStyles(() => ({
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
      transformOrigin: 'center',
    },
    to: {
      transform: 'rotate(720deg)',
      transformOrigin: 'center',
    }
  },
  
  '@keyframes zoomInZoomOut': {
    '0%': {
      transform: 'scale(0)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  '@keyframes slideRight': {
    '0%': {
      transform: 'perspective(400px) rotateY(0)',
      animationTimingFunction: 'ease-out',
      left: '0%',
    },
    '40%': {
      transform: 'perspective(400px) translateZ(-150px) rotateY(170deg)',
      animationTimingFunction: 'ease-out',
      left: '-50.75%',
    },
    '50%': {
      transform:
        'perspective(400px) translateZ(-150px) rotateY(190deg) scale(1)',
      animationTimingFunction: 'ease-in',
      left: '-65.5%',
    },
    '80%': {
      transform: 'perspective(400px) rotateY(360deg) scale(.95)',
      animationTimingFunction: 'ease-in',
      left: '-80.25%',
    },
    '100%': {
      transform: 'perspective(400px) scale(1)',
      animationTimingFunction: 'ease-in',
      left: '-90%',
    },
  },
  zoomInStar: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2vw',
    height: '2vw',
    zIndex: '1',
    animation: '$zoomInZoomOut 2s ease-out forwards',
    '-webkit-animation': '$zoomInZoomOut 2s ease-out forwards', 
    '@media (min-width:1280px)': {
      width: (props) => (props.retailMode ? '4vw' : '2vw'),
      height: (props) => (props.retailMode ? '4vw' : '2vw'),
    },
  },
  star: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4vw',
    height: '4vw',
    zIndex: '1',
    '@media (min-width:1280px)': {
      width: (props) => (props.retailMode ? '4vw' : '2vw'),
      height: (props) => (props.retailMode ? '4vw' : '2vw'),
    },
    },
  sliding: {
    position: 'absolute',
    height: '100%',
    width: '-200%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
    animation: '$slideRight 2s ease-out forwards',
    '-webkit-animation': '$slideRight 2s forwards',
  },
  spin: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4vw',
    height: '4vw',
    zIndex: '1',
    transformOrigin: 'center',
    animation: '$spin 2s ease-out forwards',
    '-webkit-animation': '$spin 2s ease-out forwards',
    '@media (min-width:1280px)': {
      width: (props) => (props.retailMode ? '4vw' : '2vw'),
      height: (props) => (props.retailMode ? '4vw' : '2vw'),
    },
  },
}));

const BonusBall = ({ offset, animationStarted, sliding, retailMode }) => {
  const classes = useStyles({ retailMode, animationStarted });


  return (
    <BallWrapper position={offset} width={4.5} height={9} zIndex={1}>
      <div className={sliding ? classes.sliding : animationStarted? '' : classes.zoomInStar}>
        <div className={animationStarted? classes.star : classes.spin}>
          <BonusBallSvg/> 
        </div>
      </div>
    </BallWrapper>
  );
};

BonusBall.propTypes = {
  offset: PropTypes.object,
  animationStarted: PropTypes.bool,
  sliding: PropTypes.bool,
  retailMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    retailMode: state.game.retailMode,
  };
}
export default connect(mapStateToProps)(BonusBall);
