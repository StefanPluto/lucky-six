import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreGameFooter from './preGameFooter/preGameFooter';
import MainGameFooter from './mainGameFooter/mainGameFooter';

const useStyles = makeStyles((theme) => ({
  root: {
    ...flex,
    position: props => props.retailMode ? 'absolute' : 'relative',
    top: props => props.retailMode ? '53vw' : '0',
    width: '100vw',
    height: '6vw',
    padding: '0 3vw',
    '@media (min-width: 1280px)': {
      width: props => props.retailMode ? '100vw' : '48vw',
      height: '3vw',
      padding: '0 1vw',
    },
    justifyContent: 'space-between',
    background: theme.palette.footer,
    margin: '0 auto',
    borderTop: `2px solid ${theme.palette.outline}`,
  },
}));

const flex = {
  display: 'flex',
  alignItems: 'center',
};

function Footer({ retailMode, game }) {
  const classes = useStyles({ retailMode });
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (game.phase < 2) {
      if(Math.floor((game.timeLeft - 120000) / 1000) < 0) return;
      setTimeLeft(Math.floor((game.timeLeft - 120000) / 1000))
    }
  }, [game.timeLeft, game.phase])

  if (game.phase >= 2) {
    return (
      <div className={classes.root}>
        <MainGameFooter />
      </div>
    );
  }
  if (game.phase < 2) {
    return (
      <div className={classes.root}>
        <PreGameFooter timeLeft={timeLeft} />
      </div>
    );
  }

  return <div></div>
}

Footer.propTypes = {
  retailMode: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(mapStateToProps)(Footer);
