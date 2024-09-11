import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: '170%',
    fontSize: (props) => props.retailMode ? '3vw' : '1.6vw',
    transform: 'skewX(-5deg)',
    textShadow: (props) =>
      props.textGray
        ? 'none'
        : `0.1vw 0.1vw ${theme.palette.gray.primary}`,
    color: (props) =>
      props.textGray === false
        ? theme.palette.background.secondary
        : theme.palette.gray.primary,
    [theme.breakpoints.down('md')]: {
      fontSize: (props) => props.retailMode ? '3.6vw' : '2.4vw',
      textShadow: (props) =>
        props.textGray
          ? 'none'
          : `0.2vw 0.2vw ${theme.palette.gray.primary}`,
    },
  },
}));

const Text = ({text, textGray, retailMode}) => {
  const classes = useStyles({text, textGray, retailMode});
  return <Box className={classes.root}>{text}</Box>;
};

Text.propTypes = {
  text: PropTypes.any,
  retailMode: PropTypes.bool.isRequired,
  textGray: PropTypes.bool.isRequired
};

export default Text;
