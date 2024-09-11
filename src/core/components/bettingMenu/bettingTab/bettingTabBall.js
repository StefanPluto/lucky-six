import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export default function BettingMenuBall({
  number,
  color,
  selectedBalls,
  handleClickBall,
}) {
  const useStyles = makeStyles({
    ballStyles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px gray solid',
      borderRadius: '50%',
      color: 'gray',
      width: '40px',
      height: '40px',
      fontSize: '20px',
      cursor: 'pointer',
      '&[aria-checked=true]': {
        borderColor: color,
        color: 'white',
      },
      '@media (max-width: 600px)': {
        width: '30px',
        height: '30px',
        fontSize: '15px',
      },
      '@media (max-width: 400px)': {
        width: '30px',
        height: '30px',
        fontSize: '16px',
      },
    },
  });

  const classes = useStyles();

  const handleClick = () => {
    handleClickBall(number);
  };
  return (
    <div style={{ margin: '0 3px' }}>
      <div
        onClick={handleClick}
        aria-checked={selectedBalls.includes(number)}
        className={classes.ballStyles}
      >
        {number}
      </div>
    </div>
  );
}

BettingMenuBall.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  selectedBalls: PropTypes.array.isRequired,
  handleClickBall: PropTypes.func.isRequired,
};
