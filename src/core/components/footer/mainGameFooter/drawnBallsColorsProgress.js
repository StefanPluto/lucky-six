import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '2vw',
    height: '80%',
    marginRight: '2px',
    '@media (min-width: 1280px)': {
      width: '1vw',
      marginRight: '4px',
    },
  },
  bar: {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    background: (props) => theme.palette.ball[props.color],
    height: (props) => `${props.timesDrawn * 16.67}%`,
  },
}));

export default function DrawnBallsColorsProgress({ color, timesDrawn }) {
  const classes = useStyles({ color, timesDrawn });

  return (
    <div className={classes.root}>
      <div
        className={classes.bar}
        style={{ opacity: 0.3, zIndex: 0, height: '100%' }}
      ></div>
      <div className={classes.bar} style={{ opacity: 1, zIndex: 1 }}></div>
    </div>
  );
}

DrawnBallsColorsProgress.propTypes = {
  color: PropTypes.string,
  timesDrawn: PropTypes.number,
};
