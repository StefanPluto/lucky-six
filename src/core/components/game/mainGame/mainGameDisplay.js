import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainBall from './balls/ballMain';
import SmallBall from './balls/ballSmall';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BallPosition from './balls/ballPosition/ballPosition';
import BonusBall from './balls/bonusBalls/bonusBall';
import Drum from './drum';
import { generateHolePositions, drumPositions, holeText } from './mainGameConstants';


const useStyles = makeStyles(() => ({
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  fadeInDiv: {
    opacity: '1',
    animation: '$fadeIn 0.5s ease-in both',
  },
}));

let ballColors = ['Red', 'Green', 'Blue', 'Purple', 'Brown', 'Yellow', 'Orange', 'Gray'];

const MainGameDisplay = ({ drawnBallNumbers, drawnBonusBalls, retailMode }) => {
  let [holePositions, setHolePositions] = useState(generateHolePositions());
  let [bonusBall1] = useState([holePositions[drawnBonusBalls[0]].position[0], holePositions[drawnBonusBalls[0]].position[1]]);
  let [bonusBall2] = useState([holePositions[drawnBonusBalls[1]].position[0], holePositions[drawnBonusBalls[1]].position[1]]);

  let [bonusBall1Chosen, setBonusBall1Chosen] = useState(false);
  let [bonusBall2Chosen, setBonusBall2Chosen] = useState(false);

  let [drumPosition, setDrumPosition] = useState(0);
  let [firstRender, setFirstRender] = useState(true);
  let [balls, setBalls] = useState([]);
  let [animationStarted] = useState(true);
  const glowImage = 'public/images/ballGlow.png';

  const classes = useStyles();

  const createBall = (ballNumber, ballIndex) => {
    let newBall = {
      index: ballIndex,
      number: ballNumber,
      color: ballColors[ballNumber % 8 === 0 ? 7 : (ballNumber % 8) - 1],
      positionOffset: {
        x: 0,
        y: 0,
      },
      firstFive: ballIndex < 5 ? true : false,
    };

    newBall.positionOffset = checkForPosition(newBall);
    return newBall;
  };

  useEffect(() => {
    if (drawnBallNumbers.length > 0) {
      if (firstRender) {
        setDrumPosition(0);
        let newBalls = drawnBallNumbers.map((number, index) => {
          if (index > 4) {
            let holePositionsTemp = [...holePositions];
            holePositionsTemp[index - 5].wasBallChosen = true;
            setHolePositions(holePositionsTemp);
          }
          return createBall(number, index);
        });
        setBalls(newBalls);
        setFirstRender(false);
      } else {
        let newBall = createBall(drawnBallNumbers[drawnBallNumbers.length - 1], drawnBallNumbers.length - 1);
        setBalls([...balls, newBall]);
      }
    }
  }, [drawnBallNumbers]);

  const checkForPosition = (newBall) => {
    if (newBall.index <= 4) {
      newBall.positionOffset.x = drumPositions[newBall.index][0];
      newBall.positionOffset.y = drumPositions[newBall.index][1];
      setDrumPosition(drumPosition + 1);
    } else {
      newBall.positionOffset.x = holePositions[newBall.index - 5].position[0];
      newBall.positionOffset.y = holePositions[newBall.index - 5].position[1];
    }
    newBall.positionOffset.x == bonusBall1[0] && newBall.positionOffset.y == bonusBall1[1] ? setBonusBall1Chosen(true) : '';
    newBall.positionOffset.x == bonusBall2[0] && newBall.positionOffset.y == bonusBall2[1] ? setBonusBall2Chosen(true) : '';

    return newBall.positionOffset;
  };

  if (balls.length > 0 && animationStarted)
    return (
      <>
        <Drum color={balls[balls.length - 1].color} number={balls[balls.length - 1].number}/>
        <MainBall color={balls[balls.length - 1].color} number={balls[balls.length - 1].number} glowImage={glowImage} />
        {balls.map((ball, index) => (
          <SmallBall color={ball.color} number={ball.number} offset={{ x: ball.positionOffset.x, y: ball.positionOffset.y }} glowImage={glowImage} firstFive={ball.firstFive} key={index} />
        ))}

        {holePositions.map((holePos, index) => (
          <BallPosition
            key={index}
            holeIndex={index}
            currentBall={balls.length}
            text={holeText[index]}
            wasBallChosen={holePos.wasBallChosen}
            offset={{ x: holePos.position[0], y: holePos.position[1] }}
            retailMode={retailMode}
          />
        ))}
        <BonusBall offset={{ x: bonusBall1[0], y: bonusBall1[1] }} animationStarted={true} sliding={bonusBall1Chosen ? true : false} />
        <BonusBall offset={{ x: bonusBall2[0], y: bonusBall2[1] }} animationStarted={true} sliding={bonusBall2Chosen ? true : false} />
      </>
    );
  return (
    <Box className={classes.fadeInDiv}>
      <Drum />
      {holePositions.map((holePos, index) => (
        <BallPosition
          key={index}
          holeIndex={index}
          currentBall={balls.length}
          text={holeText[index]}
          wasBallChosen={holePos.wasBallChosen}
          offset={{ x: holePos.position[0], y: holePos.position[1] }}
          retailMode={retailMode}
        />
      ))}
      <BonusBall offset={{ x: bonusBall1[0], y: bonusBall1[1] }} animationStarted={false} sliding={bonusBall1Chosen ? true : false} />
      <BonusBall offset={{ x: bonusBall2[0], y: bonusBall2[1] }} animationStarted={false} sliding={bonusBall2Chosen ? true : false} />
    </Box>
  );
};

MainGameDisplay.propTypes = {
  drawnBallNumbers: PropTypes.array,
  drawnBonusBalls: PropTypes.array,
  retailMode: PropTypes.bool
};

export default MainGameDisplay;
