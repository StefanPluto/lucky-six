import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StyledLinearProgress from './progressBar'
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

function PreGameFooter({ timeLeft }) {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(timeLeft)
  const normalise = (value) => (value * 100) / 120;

  const padLeft = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const convertToMS = (value) => {
    if (value < 0) return '0';
    let minutes = Math.floor((value / 60));
    var seconds = value % 60;
    return padLeft(minutes, '0', 2) + ':' + padLeft(seconds, '0', 2);
  }

  useEffect(() => {
    setCurrentTime(timeLeft - 3)
    const interval = setInterval(() => {
      setCurrentTime(prevTime => prevTime - 1)
    }, 1000)
    return () => clearInterval(interval);
  }, [timeLeft])

  return (
    <>
      <Typography
        variant="subtitle2"
        color="textPrimary"
        style={{ width: '40%' }}
      >
        {t('NextRound')}
      </Typography>
      <div style={{ width: '70%', marginRight: '3%' }}>
        <StyledLinearProgress variant="determinate" style={{ height: '8px', borderRadius: 15 }} value={normalise(currentTime)} />
      </div>
      <Typography variant="subtitle2" color="textSecondary">
        {convertToMS(currentTime)}
      </Typography>
    </>
  );
}


function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(PreGameFooter);



