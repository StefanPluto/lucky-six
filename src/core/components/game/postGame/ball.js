import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => (props.retailMode ? '4vw' : '2vw'),
    height: (props) => (props.retailMode ? '4vw' : '2vw'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'gray',
    borderRadius: '100%',
    fontSize: (props) => (props.retailMode ? '2vw' : '1vw'),
    margin: '1.4% 2%',
    padding: '0 !important',
    '&::after': {
      content: (props) => `'${props.text}'`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '92%',
      height: '92%',
      border: (props) => (props.chosen ? `2.5px solid ${props.color}` : ''),
      borderRadius: '100%',
    },
    '@media (max-width: 1280px)': {
      width: (props) => (props.retailMode ? '4vw' : '4vw'),
      height: (props) => (props.retailMode ? '4vw' : '4vw'),
      fontSize: (props) => (props.retailMode ? '2vw' : '2vw'),
    },
  },
}));

const Ball = ({ text = '', chosen = false, color = 'black', retailMode }) => {
  const classes = useStyles({ text, chosen, color, retailMode });
  return <Box className={classes.root} />;
};

Ball.propTypes = {
  text: PropTypes.number,
  chosen: PropTypes.bool,
  color: PropTypes.string,
  retailMode: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    retailMode: state.game.retailMode,
  };
}

export default connect(mapStateToProps)(Ball);
