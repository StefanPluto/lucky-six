import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PreGameDisplay from './preGame/preGameDIsplay';
import PostGameDisplay from './postGame/postGameDisplay';
import MainGameDisplay from './mainGame/mainGameDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import { setRetailMode } from './state/gameActions';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: '100vw',
    height: '56.25vw',
    '@media (min-width: 1280px)': {
      width: (props) => `${props.gameWidth}vw`,
      height: (props) => props.gameHeight,
    },
    background: `radial-gradient(circle at 50%, ${theme.palette.background.primary} 0%,${theme.palette.background.contrast} 400%)`,
    overflow: 'hidden',
  },
}));

function GameAnimaton({ retailMode, game, setRetailMode }) {
  const gameWidth = retailMode ? 100 : 48;
  const gameHeight = retailMode ? '56.25vw' : '27vw';
  const classes = useStyles({ gameWidth, gameHeight });

  useEffect(() => {
    setRetailMode(retailMode);
  }, [retailMode]);

  return (
    <>
      <Header retailMode={retailMode} />
      <Box className={classes.root}>
        {game.gameInfo !== null ? (
          game.phase === 0 ? (
            <PreGameDisplay currentTextIndex={game.data.value} timeLeft={game.timeLeft} retailMode={retailMode} />
          ) : game.phase === 1 ? (
            <PreGameDisplay currentTime={game.data.value} retailMode={retailMode} />
          ) : game.phase === 2 ? (
            <MainGameDisplay drawnBallNumbers={game.data.value} drawnBonusBalls={game.data.bonusBalls} retailMode={retailMode} />
          ) : game.phase === 3 ? (
            <PostGameDisplay chosenBalls={game.data.value} />
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </Box>
      <Footer timeLeft={game.timeLeft} retailMode={retailMode}/>
    </>
  );
}

GameAnimaton.propTypes = {
  gameWidth: PropTypes.string,
  gameHeight: PropTypes.string,
  game: PropTypes.object,
  retailMode: PropTypes.bool.isRequired,
  setRetailMode: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

const mapDispatchToProps = {
  setRetailMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameAnimaton);
