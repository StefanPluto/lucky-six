import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import GameCheckButton from './gameCheckButton';
import { mainTheme } from '../../theme/themes';
import * as gameTypes from './gameTypes';

export default function ExtraGames({
  handleClickGameButton,
  selectedGame,
  selectedBet,
  selectedFirstBallColor,
  handleChangeCheckFirstBallColor,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'block',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    row: {
      paddingBottom: '5px',
      borderBottom: `2px solid ${theme.palette.outline}`,
      margin: '0',
      textTransform: 'uppercase',
      textAlign: 'center',
      whiteSpace: 'pre-line',
    },
    button: {
      width: '100%',
      fontSize: '12px',
    },
    color: {
      padding: '0',
    },
    ball: {
      padding: '0',
    },
  }));
  const classes = useStyles();

  const colors = mainTheme.palette.ball;

  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <GameCheckButton
            text={t('Random')}
            value={'random'}
            game={'random'}
            handleClickGameButton={handleClickGameButton}
            selectedGame={selectedGame}
            selectedBet={selectedBet}
          ></GameCheckButton>
        </Grid>
        <Grid item xs={4}>
          <GameCheckButton
            text={t('AllColors')}
            value={'allColors'}
            game={'allColors'}
            handleClickGameButton={handleClickGameButton}
            selectedGame={selectedGame}
            selectedBet={selectedBet}
          ></GameCheckButton>
        </Grid>
        <Grid item xs={4}>
          <GameCheckButton
            text={t('NumberInFirstFive')}
            value={gameTypes.NUMBER_IN_FIRST_FIVE}
            game={gameTypes.NUMBER_IN_FIRST_FIVE}
            handleClickGameButton={handleClickGameButton}
            selectedGame={selectedGame}
            selectedBet={selectedBet}
          ></GameCheckButton>
        </Grid>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
          }}
          item
          xs={12}
        >
          <p className={classes.row}>{t('FirstBallColor')}</p>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {Object.entries(colors).map(([colorName, colorValue], index) => {
              return (
                <Checkbox
                  key={index}
                  icon={<RadioButtonUncheckedIcon />}
                  checked={
                    selectedGame == gameTypes.FIRST_BALL_COLOR &&
                    selectedFirstBallColor.includes(colorName)
                  }
                  onChange={handleChangeCheckFirstBallColor}
                  value={colorName}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  style={{ color: colorValue }}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              );
            })}
          </div>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('FirstNumberEvenOdd')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Even')}
                value={gameTypes.EVEN}
                game={gameTypes.FIRST_BALL_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Odd')}
                value={gameTypes.ODD}
                game={gameTypes.FIRST_BALL_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('24HiLoFirst')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Under')}
                value={gameTypes.UNDER}
                game={gameTypes.FIRST_BALL_OVER_UNDER_24}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Over')}
                value={gameTypes.OVER}
                game={gameTypes.FIRST_BALL_OVER_UNDER_24}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('LastNumberEvenOdd')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Even')}
                value={gameTypes.EVEN}
                game={gameTypes.LAST_BALL_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Odd')}
                value={gameTypes.ODD}
                game={gameTypes.LAST_BALL_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('24HiLoLast')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Under')}
                value={gameTypes.UNDER}
                game={gameTypes.LAST_BALL_OVER_UNDER_24}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Over')}
                value={gameTypes.OVER}
                game={gameTypes.LAST_BALL_OVER_UNDER_24}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              ></GameCheckButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('FirstFiveOddEven')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Even')}
                value={gameTypes.EVEN}
                game={gameTypes.FIRST_FIVE_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Odd')}
                value={gameTypes.ODD}
                game={gameTypes.FIRST_FIVE_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('FirstFiveSum')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Under')}
                value={gameTypes.UNDER}
                game={gameTypes.FIRST_FIVE_OVER_UNDER_122}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Over')}
                value={gameTypes.OVER}
                game={gameTypes.FIRST_FIVE_OVER_UNDER_122}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('LastFiveOddEven')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Even')}
                value={gameTypes.EVEN}
                game={gameTypes.LAST_FIVE_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Odd')}
                value={gameTypes.ODD}
                game={gameTypes.LAST_FIVE_ODD_EVEN}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid container item justifyContent="center" xs={12}>
              <p className={classes.row}>{t('LastFiveSum')}</p>
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Under')}
                value={gameTypes.UNDER}
                game={gameTypes.LAST_FIVE_OVER_UNDER_122}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
            <Grid item xs={6}>
              <GameCheckButton
                text={t('Over')}
                value={gameTypes.OVER}
                game={gameTypes.LAST_FIVE_OVER_UNDER_122}
                handleClickGameButton={handleClickGameButton}
                selectedGame={selectedGame}
                selectedBet={selectedBet}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ExtraGames.propTypes = {
  selectedBalls: PropTypes.array.isRequired,
  selectedGame: PropTypes.string.isRequired,
  selectedBet: PropTypes.string.isRequired,
  selectedFirstBallColor: PropTypes.array.isRequired,
  handleChangeCheckFirstBallColor: PropTypes.func.isRequired,
  handleClickGameButton: PropTypes.func.isRequired,
};
