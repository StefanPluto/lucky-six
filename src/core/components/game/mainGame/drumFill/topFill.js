import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  '@keyframes expand': {
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
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: (props) => `${props.position.y}%`,
    left: (props) => `${props.position.x}%`,
    width: (props) => `${props.position.width}%`,
    height: (props) => `${props.position.width * 2}%`,
    borderRadius: '100%',
  },
  topFill: {
    backgroundColor: (props) => props.color,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    animation: `$expand 0.3s linear both`,
    animationDelay: (props) => props.position.animationDelay,
  },
}));

const TopFill = ({ color, number, position }) => {
  const classes = useStyles({ color, position });

  return <div className={classes.root}>{color ? <div className={classes.topFill} key={number} /> : ''}</div>;
};

TopFill.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  position: PropTypes.object
};

export default TopFill;
