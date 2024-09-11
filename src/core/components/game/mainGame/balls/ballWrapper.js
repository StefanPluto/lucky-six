import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: (props) => `${-4.82 + props.position.y}%`,
    left: (props) => `${props.position.x}%`,
    width: (props) => `${props.width}%`,
    height: (props) => `${props.height}%`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: (props) => props.zIndex,
  },
}));

const BallWrapper = (props) => {
  const classes = useStyles(props);
  return <Box className={classes.root}>{props.children}</Box>;
};

BallWrapper.propTypes = {
  children: PropTypes.any,
};

export default BallWrapper;
