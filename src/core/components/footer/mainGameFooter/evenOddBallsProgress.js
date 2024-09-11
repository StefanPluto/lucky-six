import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '80px',
    height: '4px',
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  bar: {
    ...flex,
    position: 'absolute',
    width: (props) => `${props.timesDrawn * 20}%`,
    height: '100%',
    bottom: '0',
    backgroundColor: theme.palette.text.primary,
    backgroundImage: (props) =>
      `linear-gradient(150deg, ${theme.palette.text.primary} 0%, ${
        theme.palette.text.primary
      } ${props.timesDrawn * 20}%)`,
  },
}));

const flex = {
  display: 'flex',
  alignItems: 'center',
};

export default function EvenOddBallsProgress({ timesDrawn }) {
  const classes = useStyles({ timesDrawn });

  return (
    <div className={classes.root}>
      <div
        className={classes.bar}
        style={{ opacity: 0.3, zIndex: 0, width: '100%' }}
      ></div>
      <div className={classes.bar} style={{ opacity: 1, zIndex: 1 }}></div>
    </div>
  );
}

EvenOddBallsProgress.propTypes = {
  color: PropTypes.string,
  timesDrawn: PropTypes.number,
};
