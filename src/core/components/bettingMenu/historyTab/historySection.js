import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import HistoryBall from './historyBall';
import FirstBallColor from './historyFirstBallColor';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { mainTheme } from '../../theme/themes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0px',
    backgroundColor: theme.palette.background.primary,
    '@media (min-width: 1280px)': {
      display: 'block',
      width: '23vw',
      height: '100%',
      flexDirection: 'column',
      overflowY: 'auto',
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
  },
  group: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    '@media (min-width: 1280px)': {
      width: '90%',
    },
  },
  section: {
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    borderBottom: `0.5px solid ${theme.palette.background.secondary}`,
    padding: '10px 10px',
    '@media (min-width: 1280px)': {
      width: '360px',
    },
  },
  stats: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '10px',
  },
  balls: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
  games: {
    width: '100%',
    marginTop: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  game: {
    width: '90%',
    margin: '3px 0',
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

function HistorySection({ history }) {
  const [position, setPosition] = useState(1);

  const classes = useStyles();
  const { t } = useTranslation();
  const colors = Object.entries(mainTheme.palette.ball);
  const handleChangePage = (e, value) => {
    setPosition(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        {history.slice(position - 1, position).map((game, index) => (
          <div key={index} className={classes.section}>
            <div className={classes.balls}>
              {game.drawnBalls.map((ball, index) => (
                <HistoryBall
                  key={index}
                  number={ball}
                  color={colors[ball % 8][1]}
                />
              ))}
            </div>
            <div className={classes.games}>
              <div className={classes.game}>
                {t('FirstFiveSum')}: {game.firstFiveBallsOverUnder122}
              </div>
              <div className={classes.game}>
                {t('FirstFiveOddEven')}: {game.firstFiveOddEven}
              </div>
              <div className={classes.game}>
                {t('ColorBetting')}:{' '}
                {game.colorBettingColors.map((color, index) => (
                  <FirstBallColor key={index} color={color} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.group} style={{ marginTop: '20px' }}>
        <Pagination
          count={10}
          page={position}
          onChange={handleChangePage}
          variant="outlined"
        />
      </div>
    </div>
  );
}

HistorySection.propTypes = {
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    history: state.history,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HistorySection);
