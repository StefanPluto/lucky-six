import React from 'react';
import PropTypes from 'prop-types';
import Ball from './bettingTabBall';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { mainTheme } from '../../theme/themes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  balls: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '380px',
    height: '400px',
    '@media (max-width: 600px)': {
      width: '300px',
      height: '270px',
    },
    '@media (max-width: 400px)': {
      width: '320px',
      height: '260px',
    },
  },
  radioButton: {
    margin: '3px 2px',
    '@media (max-width: 600px)': {
      width: '30px',
      height: '30px',
      marginRight: '4px',
    },
    '@media (max-width: 400px)': {
      width: '30px',
      height: '20px',
      marginRight: '4px',
    },
  },
}));

export default function StandardGame({
  selectedGame,
  handleChangeSelectedColor,
  selectedBalls,
  handleClickBall,
}) {
  const classes = useStyles();

  let balls = [];
  const colors = Object.entries(mainTheme.palette.ball);

  for (var i = 1; i <= 48; i++) {
    balls.push(i);
  }

  let colorCeckboxes = [];
  for (let x = 0; x < 8; x++) {
    colorCeckboxes.push(x);
  }

  const checkColor = (index) => {
    var arr = [];
    selectedBalls.forEach((ball) => {
      if (index == (ball % 8) - 1) {
        arr.push(ball);
      } else if (index == 7) {
        if (ball % 8 == 0) {
          arr.push(ball);
        }
      }
    });
    if (arr.length == 6) {
      return true;
    } else return false;
  };

  return (
    <div className={classes.balls}>
      {balls.map((ball, index) => {
        return (
          <Ball
            key={index}
            ball={ball}
            color={colors[index % 8][1]}
            number={ball}
            selectedBalls={selectedBalls}
            handleClickBall={handleClickBall}
          />
        );
      })}

      <div>
        {colorCeckboxes.map((checkedColor, index) => {
          return (
            <Checkbox
              checked={checkColor(index) || selectedGame == 'allColors'}
              value={index}
              onChange={(event) => {
                handleChangeSelectedColor(event, balls);
              }}
              key={index}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              style={{ color: colors[index % 8][1] }}
              className={classes.radioButton}
            />
          );
        })}
      </div>
    </div>
  );
}

StandardGame.propTypes = {
  selectedGame: PropTypes.string.isRequired,
  selectedBalls: PropTypes.array.isRequired,
  handleChangeSelectedColor: PropTypes.func.isRequired,
  handleClickBall: PropTypes.func.isRequired,
};
