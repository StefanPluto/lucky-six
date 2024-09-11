import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress
        variant='determinate'
        style={{
          width: '55px',
          height: '55px',
          color: '#3489eb',
          margin: '10px',
        }}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          style={{ fontSize: '9px', color: 'white' }}
          component='div'
        >
          {props.name}
        </Typography>
        <Typography
          variant='caption'
          style={{ fontSize: '12px', color: '#40ccff' }}
          component='div'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default function Progress({ progress, name }) {
  return <CircularProgressWithLabel value={progress} name={name} />;
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
