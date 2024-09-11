import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BallHoleSvg from '../ballSvgs/ballHoleSvg';
import Text from './ballPositionText';
import Arrow from './ballPositionArrow';
import BallWrapper from '../ballWrapper';

const BallPosition = ({
  currentBall,
  holeIndex,
  offset,
  text,
  wasBallChosen,
  retailMode
}) => {
  let [wasChosen, setWasChosen] = useState(wasBallChosen);
  useEffect(() => {
    if (currentBall - 7 === holeIndex) {
      setWasChosen(true);
    }
  }, [currentBall]);
  return (
    <BallWrapper position={offset} width={4.5} height={9} zIndex={0} >
      <BallHoleSvg />
      <Arrow hide={wasChosen} />
      <Text textGray={wasChosen} text={text} retailMode={retailMode} />
    </BallWrapper>
  );
};

BallPosition.propTypes = {
  holeIndex: PropTypes.number,
  currentBall: PropTypes.number,
  offset: PropTypes.object,
  text: PropTypes.any,
  wasBallChosen: PropTypes.bool,
  retailMode: PropTypes.bool.isRequired
};

export default BallPosition;
