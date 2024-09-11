import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

export default function HistoryBall({ number, color }) {
  const useStyles = makeStyles({
    ballStyles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid',
      borderColor: color,
      borderRadius: '50%',
      color: 'white',
      width: '24px',
      height: '24px',
      fontSize: '12px',
      cursor: 'pointer',
    },
    ballContainer: {
      margin: '6px',
    },
    amountContainer: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '12px',
      marginTop: '3px',
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.ballContainer}>
      <div className={classes.ballStyles}>{number}</div>
    </div>
  );
}

HistoryBall.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  numberOfDraws: PropTypes.number.isRequired,
};
