import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Ball from './ball';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
    textAlign: 'center',
    fontSize: (props) => (props.retailMode ? '1.6vw' : '0.8vw'),
    color: theme.palette.text.primary,
    '& span': {
      fontSize: (props) => (props.retailMode ? '2vw' : '1vw'),
      textTransform: 'uppercase',
      color: (props) => props.color,
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.5%',
      fontSize: (props) => (props.retailMode ? '2vw' : '1.4vw'),
      '& span': {
        fontSize: (props) => (props.retailMode ? '1.6vw' : '1.4vw'),
      },
    },
  },
}));

const Game = ({ balls = [], text = '', color, name = '', retailMode }) => {
  const classes = useStyles({ balls, text, color, name, retailMode });
  return (
    <Grid item className={classes.root} display="flex">
      {name}
      <Box className={classes.root} display="flex" direction="row">
        {balls.length !== 0 ? (
          balls.map((ball) => (
            <Ball
              key={ball.ballNumber}
              color={ball.color}
              chosen={true}
              text={ball.ballNumber}
            ></Ball>
          ))
        ) : (
          <span>{text}</span>
        )}
      </Box>
    </Grid>
  );
};

Game.propTypes = {
  firstFiveBalls: PropTypes.array,
  balls: PropTypes.array,
  name: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  retailMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    retailMode: state.game.retailMode,
  };
}

export default connect(mapStateToProps)(Game);
