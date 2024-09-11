import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  colorPrimary: {
    backgroundColor: "black"
  },
  barColorPrimary: {
    backgroundColor: theme.palette.outline
  },
});

const StyledLinearProgress = withStyles(styles)(LinearProgress);

export default StyledLinearProgress;
