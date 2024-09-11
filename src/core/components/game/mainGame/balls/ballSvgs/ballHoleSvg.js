import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fill: {
    fill: theme.palette.hole.fill,
  },
  stroke: {
    stroke: theme.palette.hole.outline,
  },
}));

const BallHoleSvg = () => {
  const classes = useStyles();
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      height='100%'
      viewBox='0 0 200.000000 200.000000'
      preserveAspectRatio='xMidYMid meet'
      className={classes.fill}
    >
      <g
        transform='translate(10,190) scale(0.09,-0.09)'
        strokeWidth='50%'
        className={classes.stroke}
      >
        <path d='M845 1986 c-309 -48 -587 -249 -729 -526 -322 -626 76 -1370 778 -1451 340 -40 691 110 896 383 460 610 111 1479 -640 1593 -112 18 -196 18 -305 1z'></path>
      </g>
    </svg>
  );
};

export default BallHoleSvg;
