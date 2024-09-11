import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DrawnBallsColorsProgress from './drawnBallsColorsProgress';
import EvenOddBallsProgress from './evenOddBallsProgress';
import { mainTheme } from '../../theme/themes';

const useStyles = makeStyles((theme) => ({
  colorSection: {
    ...flex,
    height: '100%',
    position: 'relative',
  },
  main: {
    ...flex,
    justifyContent: 'center',
    '&>*:not(:last-child)': {
      marginRight: '15px',
    },
  },
  line: {
    ...flex,
    '&>*:not(:last-child)': {
      marginRight: '5px',
    },
    color: theme.palette.text.primary
  },
  text: {
    color: mainTheme.palette.text.primary,
    fontWeight: 'bold'
  }
}));

const flex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function MainGameFooter({ currentGameStatistics }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { ballColors, firstFiveEven, firstFiveOdd, firstFiveSum } =
    currentGameStatistics;

  return (
    <>
      <div className={classes.colorSection}>
        {Object.entries(ballColors).map(([color, timesDrawn], index) => (
          <DrawnBallsColorsProgress
            key={index}
            color={color}
            timesDrawn={timesDrawn}
          />
        ))}
      </div>
      <div className={classes.main}>
        <div>
          <Typography className={classes.text} variant="subtitle2" align="right">
            {t('NumsSum')}
          </Typography>
          <Typography className={classes.text} variant="subtitle2" align="right">
            -122,5+
          </Typography>
        </div>
        <div>
          <Typography variant="h6" fontWeight={800}>
            {firstFiveSum}
          </Typography>
        </div>
        <div>
          <Typography className={classes.text} variant="subtitle2">
            {t('Over').toUpperCase()}
          </Typography>
          <Typography className={classes.text} variant="subtitle2">
            {t('Under').toUpperCase()}
          </Typography>
        </div>
      </div>
      <div>
        <div className={classes.line}>
          <Typography className={classes.text} variant="subtitle2">
            {t('Even')}
          </Typography>
          <EvenOddBallsProgress timesDrawn={firstFiveEven} />
          <Typography variant="subtitle2">
            {firstFiveEven}
          </Typography>
        </div>
        <div className={classes.line}>
          <Typography className={classes.text} variant="subtitle2">
            {t('Odd')}
          </Typography>
          <EvenOddBallsProgress timesDrawn={firstFiveOdd} />
          <Typography variant="subtitle2">
            {firstFiveOdd}
          </Typography>
        </div>
      </div>
    </>
  );
}

MainGameFooter.propTypes = {
  currentGameStatistics: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentGameStatistics: state.currentGameStatistics,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainGameFooter);
