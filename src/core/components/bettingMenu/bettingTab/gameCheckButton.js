import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function GameCheckButton({
  text,
  value,
  game,
  selectedGame,
  handleClickGameButton,
  selectedBet,
}) {
  const useStyles = makeStyles((theme) => ({
    button: {
      width: '100%',
      height: '100%',
      fontSize: '12px',
      fontWeight: '500',
      border: `1px ${theme.palette.background.secondary} solid`,
      color: 'white',
      cursor: 'pointer',
      '&[aria-checked=true]': {
        backgroundColor: theme.palette.background.contrast,
      },
      '&:focus': {
        outline: 'none',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Button
      onClick={() => {
        handleClickGameButton(game, value);
      }}
      aria-checked={
        game == 'numberInFirst5' || game == 'random'
          ? selectedGame === game
          : selectedGame === game && selectedBet === value
      }
      className={classes.button}
    >
      {text}
    </Button>
  );
}

GameCheckButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  handleClickGameButton: PropTypes.func.isRequired,
  selectedGame: PropTypes.string.isRequired,
  selectedBet: PropTypes.string.isRequired,
};
