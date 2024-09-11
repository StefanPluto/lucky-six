import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

export default function FirstBallColorHistory({ color }) {
  const useStyles = makeStyles({
    firstBallStyles: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10px',
    },
    iconStyle: {
      color: color,
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.firstBallStyles}>
      <RadioButtonCheckedIcon className={classes.iconStyle} />
    </div>
  );
}

FirstBallColorHistory.propTypes = {
  color: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
