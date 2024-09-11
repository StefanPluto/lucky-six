import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    ...headerStyles,
    position: (props) => (props.retailMode ? 'absolute' : 'relative'),
    top: 0,
    width: '100vw',
    height: '6vw',
    '@media (min-width: 1280px)': {
      width: (props) => (props.retailMode ? '100vw' : '48vw'),
      height: '3vw',
    },
    backgroundColor: theme.palette.header.primary,
    margin: '0 auto',
    borderBottom: `2px solid ${theme.palette.outline}`,
  },
  header: {
    ...headerStyles,
    background: 'rgba(0,0,0, 0.2)',
    width: '30%',
    height: '100%',
    fontSize: '5%',
    clipPath: 'polygon(0 1%, 100% 0, 95% 100%, 5% 100%)',
    flexDirection: 'column',
    color: theme.palette.text.primary
  },
  bottomHeader: {
    background: theme.palette.background.primary,
    width: (props) => (props.retailMode ? '100vw' : '40%'),
    height: '35%',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    clipPath: 'polygon(0 1%, 100% 0, 99% 100%, 1% 100%)',
    top: '6vw',
    zIndex: '300',
    opacity: '0.5',
    '@media (max-width: 1280px)': {
      width: '60vw',
    },
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      width: '350px',
    },
  },
  gameCount: {
    ...headerStyles,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: '2vw',
    color: theme.palette.text.primary,
  },
  gameRounds: {
    marginRight: 6,
    marginTop: 3,
    fontWeight: 'bold'
  },
}));

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Header({ game, retailMode }) {
  const classes = useStyles({ retailMode });
  const { t } = useTranslation();

  return (
    <AppBar className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">
          {t('GameName')}
        </Typography>
      </div>
      <div className={classes.gameCount}>
        <Typography variant="subtitle2" className={classes.gameRounds}>
          {t('GameRounds')}
        </Typography>
        <Typography variant="h6">
          {game.gameInfo ? game.gameInfo.round : 0}
        </Typography>
      </div>
      {/* <div className={classes.bottomHeader}>
        <Typography variant="subtitle1" color="textPrimary">
          {t('GameLuckyJP')}:
          <Typography variant="span1" color="textSecondary">
            7.906.43 RSD
          </Typography>
        </Typography>

        <Typography variant="subtitle1" color="textPrimary">
          {t('GameGlobalJP')}:
          <Typography variant="span1" color="textSecondary">
            7.906.43 RSD
          </Typography>
        </Typography>
      </div> */}
    </AppBar>
  );
}

Header.propTypes = {
  game: PropTypes.object,
  retailMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
