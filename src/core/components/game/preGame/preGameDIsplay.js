import React from 'react';
import PropTypes from 'prop-types';
import GameTextAnimation from './gameText/gameTextAnimation';
import CountdownAnimation from './countdown/countDownAnimation';

const PreGameDisplay = ({currentTime, currentTextIndex, retailMode}) => {
  return currentTime ? (
    <CountdownAnimation currentTime={currentTime} retailMode={retailMode} />
  ) : (
    <GameTextAnimation currentGameIndex={currentTextIndex} retailMode={retailMode} />
  );
};

PreGameDisplay.propTypes = {
  currentTime: PropTypes.number,
  currentTextIndex: PropTypes.number,
  retailMode: PropTypes.bool
};

export default PreGameDisplay;
