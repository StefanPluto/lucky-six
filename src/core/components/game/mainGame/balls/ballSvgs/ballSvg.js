import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fill: (props) =>
      props.color == 'Red'
        ? theme.palette.ball.red
        : props.color == 'Green'
        ? theme.palette.ball.green
        : props.color == 'Blue'
        ? theme.palette.ball.blue
        : props.color == 'Purple'
        ? theme.palette.ball.purple
        : props.color == 'Brown'
        ? theme.palette.ball.brown
        : props.color == 'Yellow'
        ? theme.palette.ball.yellow
        : props.color == 'Orange'
        ? theme.palette.ball.orange
        : theme.palette.ball.black,
  },
}));

const BallSvg = ({ color, number }) => {
  const classes = useStyles({ color });

  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      height='100%'
      viewBox='0 0 200.000000 200.000000'
      preserveAspectRatio='xMidYMid meet'
      style={{ position: 'absolute' }}
    >
      <g
        transform='translate(0,200) scale(0.1,-0.1)'
        className={classes.root}
        stroke='none'
      >
        <path d='M845 1986 c-309 -48 -587 -249 -729 -526 -322 -626 76 -1370 778 -1451 340 -40 691 110 896 383 460 610 111 1479 -640 1593 -112 18 -196 18 -305 1z'></path>
      </g>
      <g
        transform='translate(10,190) scale(0.09,-0.09)'
        fill={(color=='Yellow' || color=='Orange') ? 'black' : 'white'}
        stroke='none'
      >
        <path d='M845 1986 c-309 -48 -587 -249 -729 -526 -322 -626 76 -1370 778 -1451 340 -40 691 110 896 383 460 610 111 1479 -640 1593 -112 18 -196 18 -305 1z'></path>
      </g>
      <g
        transform='translate(20,180) scale(0.08,-0.08)'
        className={classes.root}
        stroke='none'
      >
        <path d='M845 1986 c-309 -48 -587 -249 -729 -526 -322 -626 76 -1370 778 -1451 340 -40 691 110 896 383 460 610 111 1479 -640 1593 -112 18 -196 18 -305 1z'></path>
      </g>
      <text
        x='50%'
        y='55%'
        dominantBaseline='middle'
        textAnchor='middle'
        fill={(color=='Yellow' || color=='Orange') ? 'black' : 'white'}
        fontSize='700%'
      >
        {number}
      </text>
    </svg>
  );
};

BallSvg.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
};

export default BallSvg;
