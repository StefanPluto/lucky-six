import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TopFill from './drumFill/topFill';
import { drumFillPositions } from './mainGameConstants';

const useStyles = makeStyles(() => ({
  '@keyframes fillUp': {
    '0%': {
      bottom: '39%',
      height: '2%',
      width: '7%',
      left: '52.5%',
    },
    '100%': {
      bottom: '37.5%',
      height: '34%',
      width: '17%',
      left: '53%',
    },
  },
  bottomFill: {
    backgroundColor: (props) => props.color,
    filter: 'saturate(90%)',
    position: 'absolute',
    bottom: '37.5%',
    left: '52.7%',
    width: '17%',
    height: '34%',
    transform: 'rotate(11deg)',
    clipPath: 'polygon(66% 0, 85% 23%, 84% 50%, 68% 74%, 47% 89%, 24% 97%, 0 100%, 0 64%, 0 0, 25% 0)',
    animation: '$fillUp 1s linear both',
  },
  drumBackground: {
    position: 'absolute',
    top: '10%',
    left: '32%',
    width: '36%',
    height: 'auto',
  },
  drumBalls: {
    position: 'absolute',
    width: '25%',
    height: 'auto',
    top: '10.5%',
    left: '40.5%',
  },
  drum: {
    position: 'absolute',
    top: '-26.5%',
    height: 'auto',
    left: '15.8%',
    width: '70%',
  },
}));

const Drum = ({ color, number }) => {
  const classes = useStyles({ color, number });
  const imageLinks = ['public/images/drum-background.png', 'public/animations/drum-animation.gif', 'public/images/drum-foreground.png'];

  return (
    <div>
      {color ? <div className={classes.bottomFill} key={number} /> : ''}
      {drumFillPositions.map((position, index) => {
        return <TopFill color={color} number={number} position={position} key={index} />;
      })}
      <img src={imageLinks[0]} className={classes.drumBackground} />
      <img src={imageLinks[1]} className={classes.drumBalls} />
      <img src={imageLinks[2]} className={classes.drum} />
    </div>
  );
};

Drum.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number
};

export default Drum;
