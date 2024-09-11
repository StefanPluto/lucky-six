import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Ball from './ball';
import Game from './game';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0',
      transform: 'perspective(100vw) translateZ(0vw)',
    },
    '100%': {
      opacity: '1',
      transform: 'perspective(100vw) translateZ(1vw)',
    },
  },
  gameOutcome: {
    display: 'flex',
    alignItems: 'center',
    opacity: '0',
    width: '95%',
    height: '75%',
    border: `5px solid ${theme.palette.background.secondary}`,
    backgroundColor: theme.palette.background.primary,
    filter: 'brightness(120%)',
    boxShadow: '0 1.2vw 0.8vw -0.6vw black',
    transform: 'perspective(100vw) translateZ(-1vw)',
    animation: '$fadeIn 0.5s ease-in both',
  },
  selectedBallsSection: {
    width: '60%',
    height: '95%',
    border: `2px solid ${theme.palette.background.secondary}`,
    margin: '0.5%',
    padding: '0 0.5% 0.5% 0.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '40%',
    height: '95%',
    margin: '0.5%',
    padding: '0.5%',
    border: `2px solid ${theme.palette.background.secondary}`,
    color: theme.palette.text.primary,
    '& span': {
      '&:nth-child(1)': {
        fontSize: (props) => (props.retailMode ? '2.4vw' : '1.2vw'),
        [theme.breakpoints.down('md')]: {
          fontSize: (props) => (props.retailMode ? '2.4vw' : '2.4vw'),
        },
      },
    },
  },
}));

let ballColors = [
  'Red',
  'Green',
  'Blue',
  'Purple',
  'Brown',
  'Yellow',
  'Orange',
  'Gray',
];

const PostGameDisplay = ({ chosenBalls, retailMode }) => {
  let [balls, setBalls] = useState(
    Array.from({ length: 48 }, (x, i) => ({
      ballNumber: i + 1,
      chosen: false,
      color: ballColors[(i + 1) % 8 === 0 ? 7 : ((i + 1) % 8) - 1],
    }))
  );
  let [firstBall, setFirstBall] = useState([]);
  let [bonusBalls, setBonusBalls] = useState([]);
  let [firstFiveBalls, setFirstFiveBalls] = useState([]);
  let firstFive = [];

  useEffect(() => {
    let ballsTemp = balls;
    ballsTemp.forEach((ball) => {
      chosenBalls.forEach((chosenBall) => {
        if (chosenBall === ball.ballNumber) {
          ball.chosen = true;
        }
      });
    });
    chosenBalls.slice(0, 5).forEach((ball) => {
      firstFive.push(
        ballsTemp[
          ballsTemp.findIndex((tempBall) => tempBall.ballNumber === ball)
        ]
      );
    });
    setBalls(ballsTemp);
    setFirstBall(firstFive[0]);
    setFirstFiveBalls(firstFive);
    setBonusBalls(ballsTemp.slice(5, 7));
  }, []);

  const classes = useStyles({ retailMode });
  const { t } = useTranslation();

  return (
    <Box className={classes.gameOutcome}>
      <Grid
        container
        justifyContent="center"
        className={classes.selectedBallsSection}
        spacing={1}
      >
        {balls.map((ball) => (
          <Ball
            key={ball.ballNumber}
            color={ball.color}
            chosen={ball.chosen}
            text={ball.ballNumber}
          ></Ball>
        ))}
      </Grid>
      <Grid container justifyContent="center" className={classes.resultsSection}>
        <span>{t('Results')}</span>
        <Game balls={firstFiveBalls} name={t('PostGame1Name')}></Game>
        <Game
          text={firstBall.ballNumber > 24.5 ? t('Over') : t('Under')}
          name={t('PostGame2Name')}
        ></Game>
        <Game
          text={t(firstBall.color)}
          color={firstBall.color}
          name={t('PostGame3Name')}
        ></Game>
        <Game
          text={firstBall.ballNumber % 2 === 0 ? t('Even') : t('Odd')}
          name={t('PostGame4Name')}
        ></Game>
        <Game balls={bonusBalls} name={t('PostGame5Name')}></Game>
      </Grid>
    </Box>
  );
};

PostGameDisplay.propTypes = {
  chosenBalls: PropTypes.array,
  retailMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    retailMode: state.game.retailMode,
  };
}

export default connect(mapStateToProps)(PostGameDisplay);
