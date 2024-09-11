import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import StatisticsProgress from './statisticsProgress';
import StatisticsBall from './statisticsBall';
import FirstBallColor from './statisticsFirstBallColor';
import { connect } from 'react-redux';
import { mainTheme } from '../../theme/themes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    '@media (min-width: 1280px)': {
      display: 'block',
      overflowY: 'auto',
      height: '100%',
      width: '23vw',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
    },
    '@media (max-width: 600px)': {
      display: 'block',
      overflowY: 'auto',
      height: '100%',
      width: '100%',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
    },
    backgroundColor: theme.palette.background.primary,

    [theme.breakpoints.up('xs')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('md')]: {},
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
    borderBottom: `0.5px solid ${theme.palette.background.secondary}`,
    padding: '10px 0 10px 0',
    [theme.breakpoints.up('xs')]: {
      height: '130px',
    },
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  group: {
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '50%',
    },
  },
}));

function StatisticsSection({ statistics }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const colors = Object.entries(mainTheme.palette.ball);

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <div className={classes.section}>
          <p>{t('DrawnMostTimes')}</p>
          <div className={classes.stats}>
            {statistics.drawnMostTimes
              ? statistics.drawnMostTimes.map((timesDrawn, index) => {
                  return (
                    <StatisticsBall
                      number={timesDrawn.ballNumber}
                      numberOfDraws={timesDrawn.numberOfTimesDrawn}
                      color={colors[(timesDrawn.ballNumber - 1) % 8][1]}
                      key={index}
                    />
                  );
                })
              : ''}
          </div>
        </div>

        <div className={classes.section}>
          <p>{t('DrawnLeastTimes')}</p>
          <div className={classes.stats}>
            {statistics.drawnLeastTimes
              ? statistics.drawnLeastTimes.map((timesDrawn, index) => {
                  return (
                    <StatisticsBall
                      number={timesDrawn.ballNumber}
                      numberOfDraws={timesDrawn.numberOfTimesDrawn}
                      color={colors[(timesDrawn.ballNumber - 1) % 8][1]}
                      key={index}
                    />
                  );
                })
              : ''}
          </div>
        </div>

        <div className={classes.section}>
          <p style={{ textAlign: 'center' }}>{t('FirstNumberEvenOdd')}</p>
          <div className={classes.stats}>
            <StatisticsProgress
              progress={statistics.firstBallEvenPercentage}
              name={t('Even')}
            />
            <StatisticsProgress
              progress={statistics.firstBallOddPercentage}
              name={t('Odd')}
            />
          </div>
        </div>
      </div>

      <div className={classes.group}>
        <div className={classes.section}>
          <p>{t('24HiLo')}</p>
          <div className={classes.stats}>
            <StatisticsProgress
              progress={statistics.firstBallOver24Percentage}
              name={t('Over')}
            />
            <StatisticsProgress
              progress={statistics.firstBallUnder24Percentage}
              name={t('Under')}
            />
          </div>
        </div>

        <div className={classes.section}>
          <p style={{ textAlign: 'center' }}>{t('FirstFiveOddEven')}</p>
          <div className={classes.stats}>
            <StatisticsProgress
              progress={statistics.firstFiveEvenPercentage}
              name={t('Even')}
            />
            <StatisticsProgress
              progress={statistics.firstFiveOddPercentage}
              name={t('Odd')}
            />
          </div>
        </div>

        <div className={classes.section}>
          <p style={{ textAlign: 'center' }}>{t('FirstFiveSum')}</p>
          <div className={classes.stats}>
            <StatisticsProgress
              progress={statistics.firstFiveBallsOver122Percentage}
              name={t('Over')}
            />
            <StatisticsProgress
              progress={statistics.firstFiveBallsUnder122Percentage}
              name={t('Under')}
            />
          </div>
        </div>
      </div>

      <div className={classes.group}>
        <div className={classes.section}>
          <p>{t('FirstBallColor')}</p>
          <div className={classes.stats}>
            {statistics.firstBallColors
              ? Object.entries(statistics.firstBallColors).map(
                  (color, index) => {
                    return (
                      <FirstBallColor
                        amount={color[1]}
                        color={color[0]}
                        key={index}
                      />
                    );
                  }
                )
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

StatisticsSection.propTypes = {
  statistics: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    statistics: state.statistics,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsSection);
