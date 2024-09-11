import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextBorder from './textBorder';

const useStyles = makeStyles((theme) => ({
  '@keyframes show': {
    '8.5%': {
      opacity: '0',
    },
    '13.5%': {
      opacity: '1',
    },
    '85%': {
      opacity: '1',
    },
    '88%': {
      opacity: '0',
    },
    '100%': {
      opacity: '0',
    },
  },
  root: {
    position: 'absolute',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    '& span': {
      opacity: '0',
      animation: '$show 8s infinite linear both',
      textTransform: 'uppercase',
      color: theme.palette.text.primary,
      '&:nth-child(1)': {
        fontSize: props => props.retailMode ? '6vw' : '3vw',
        textStrokeWidth: '0.08vw',
        [theme.breakpoints.down('md')]: {
          fontSize: props => props.retailMode ? '5vw' : '5vw',
          textStrokeWidth: '0.12vw',
        },
      },
      '&:nth-child(3)': {
        fontSize: props => props.retailMode ? '3.6vw' : '1.8vw',
        textStrokeWidth: '0.04vw',
        [theme.breakpoints.down('md')]: {
          fontSize: props => props.retailMode ? '3.6vw' : '3.6vw',
          textStrokeWidth: '0.08vw',
        },
      },
      '&:nth-child(5)': {
        fontSize: props => props.retailMode ? '3vw' : '1.5vw',
        textStrokeWidth: '0.03vw',
        [theme.breakpoints.down('md')]: {
          fontSize: props => props.retailMode ? '3vw' : '3vw',
          textStrokeWidth: '0.06vw',
        },
      },
    },
  },
}));
const TextContainer = ({ currentGameIndex, retailMode }) => {
  const classes = useStyles({retailMode});
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
      <span style={{ whiteSpace: 'pre-line' }}>
        {t(`Game${currentGameIndex + 1}Name`)}
      </span>
      <TextBorder startingPosition={'left'} />
      <span style={{ whiteSpace: 'pre-line' }}>
        {t(`Game${currentGameIndex + 1}Description`)}
      </span>
      <TextBorder startingPosition={'right'} />
      <span style={{ whiteSpace: 'pre-line' }}>
        {t(`Game${currentGameIndex + 1}SubDescription`)}
      </span>
    </Box>
  );
};

TextContainer.propTypes = {
  currentGameIndex: PropTypes.number,
  retailMode: PropTypes.bool
};

export default TextContainer;
