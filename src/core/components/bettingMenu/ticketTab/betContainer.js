import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeBet, updateBet, setFutureBet, updateTicketStake, clearTicket, setCurrentlyEditing, setInvalidBet } from './state/betActions';
import { payInTicket, getCurrentBalance, getTicketHistory } from '../../player/state/playerActions';
import { setSelectedBalls } from '../bettingTab/state/currentBetActions';
import { openNotification } from '../../notification/state/notificationActions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneIcon from '@material-ui/icons/Done';
import { mainTheme } from '../../theme/themes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mainContainer: {
    minHeight: '350px',
    height: '360px',
    marginBottom: '10px',
    width: '99%',
    overflowY: 'auto',
    justifyContent: 'flex-end',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
    '@media (min-width: 1280px)': {
      width: '100%',
      minHeight: '45%',
      height: '47%',
      margin: '0px',
    },
  },

  betContainer: {
    width: '99%',
    margin: 'auto',
    padding: '10px',
    backgroundColor: theme.palette.background.secondary,
  },
  payButton: {
    width: '100%',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.secondary,
    fontWeight: '600',
    '@media (min-width: 1280px)': {
      width: '96%',
      marginLeft: '15px',
    },
    '&:hover': {
      backgroundColor: `${theme.palette.background.contrast}`,
    },
  },
  inputText: {
    color: theme.palette.text.primary,
  },
  inputNumber: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
    color: theme.palette.text.primary,
    backgroundColor: 'gray',
  },
  defaultStake: {
    width: '100%',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.secondary,
    fontWeight: '600',
    '@media (min-width: 1280px)': {
      minWidth: '90%',
    },
    '&:hover': {
      backgroundColor: `${theme.palette.background.contrast}`,
    },
  },
  defaultStakeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '99%',
    padding: '5px 0px',
    '@media (min-width: 1280px)': {
      minWidth: '98%',
    },
  },
  bottomContent: {
    width: '99%',
    margin: 'auto',
  },
  invalidBet: {
    border: '2px solid red',
  },
}));

function BetContainer({
  updateBet,
  setFutureBet,
  removeBet,
  payInTicket,
  getTicketHistory,
  clearTicket,
  updateTicketStake,
  ticket,
  player,
  game,
  openNotification,
  handleBet,
  setCurrentlyEditing,
  setSelectedBalls,
  setInvalidBet,
  marketplace,
}) {
  const classes = useStyles();

  const [defaultBets, setDefaultBets] = useState([]);
  useEffect(() => {
    let newDefaultBets = defaultBets;
    for (let i = 1; i < 7; i++) {
      switch (i) {
        case 1:
          newDefaultBets.push(i * marketplace.minimumTotalStake)
          break;
        case 2:
          newDefaultBets.push(i * marketplace.minimumTotalStake)
          break;
        case 3:
          newDefaultBets.push(4 * marketplace.minimumTotalStake)
          break;
        case 4:
          newDefaultBets.push(8 * marketplace.minimumTotalStake)
          break;
        case 5:
          newDefaultBets.push(10 * marketplace.minimumTotalStake)
          break;
        case 6:
          newDefaultBets.push(marketplace.maximumTotalStake)
          break;
        default:
          break;
      }
      setDefaultBets(newDefaultBets)
    }
  }, [])

  const handleBetStakeChange = (index, stake, gameType) => {
    updateBet(index, stake);
    if (stake < calculateMinimumBet(gameType)) {
      setInvalidBet(index, true);
    } else setInvalidBet(index, false);
  };

  const handleChangeTotalStake = (event) => {
    updateTicketStake(event.target.value);
  };

  const handleChangeDefaultStake = (value) => {
    updateTicketStake(value);
  };

  const handleTicketSubmit = async () => {
    let notificationData = {
      message: 'BetSuccess',
      isOpen: true,
      duration: 3000,
      severity: 'success',
    };

    let invalid = false;
    if (ticket.bets.length == 0) {
      invalid = true;
      notificationData.message = 'EmptyBet';
    } else {
      ticket.bets.forEach((bet) => {
        if (bet.invalid) {
          invalid = true;
          if (
            bet.gameType == 'system_6/7' ||
            bet.gameType == 'system_6/8' ||
            bet.gameType == 'system_6/9' ||
            bet.gameType == 'system_6/10'
          ) {
            notificationData.message = 'InvalidBetSystem';
          }
          else {
            notificationData.message = 'InvalidBet';
          }
          notificationData.severity = 'warning';
          openNotification(notificationData);
        }
      });
    }

    if (!invalid) {
      const canClearTicket = await payInTicket(ticket, player.sessionId);
      if (canClearTicket) {
        clearTicket();
        await getTicketHistory();
        openNotification(notificationData);
      }
    }
  };

  const handleFutureBetChange = (futureBet) => {
    setFutureBet(futureBet);
  };

  const handleSelectedBalls = (gameType, balls) => {
    if (
        gameType === 'standard' ||
        gameType == 'system_6/7' ||
        gameType == 'system_6/8' ||
        gameType == 'system_6/9' ||
        gameType == 'system_6/10' ||
        gameType === 'numberInFirst5'
      ) { 
        setSelectedBalls(balls); 
      }
  };

  const checkEditing = (index) => {
    if (ticket.currentlyEditing === index) {
      return true;
    } else {
      return false;
    }
  };

  const calculateMinimumBet = (gameType) => {
    let minimumStake = 0;
    switch(gameType) {
      case 'system_6/7':
        minimumStake = marketplace.minimumStakePerCombination * 7;
        break;
      case 'system_6/8':
        minimumStake = marketplace.minimumStakePerCombination * 28;
        break;
      case 'system_6/9':
        minimumStake = marketplace.minimumStakePerCombination * 84;
        break;
      case 'system_6/10':
        minimumStake = marketplace.minimumStakePerCombination * 210;
        break;
      default: 
        minimumStake = marketplace.minimumStakePerBet;
        break;
    }
    return minimumStake;
  }

  const calculateMaximumBet = (gameType) => {
    let maximumStake = 0;
    switch(gameType) {
      case 'system_6/7':
        maximumStake = marketplace.maximumStakePerCombination * 7;
        break;
      case 'system_6/8':
        maximumStake = marketplace.maximumStakePerCombination * 28;
        break;
      case 'system_6/9':
        maximumStake = marketplace.maximumStakePerCombination * 84;
        break;
      case 'system_6/10':
        maximumStake = marketplace.maximumStakePerCombination * 210;
        break;
      default: 
        maximumStake = marketplace.maximumStakePerBet;
        break;
    }
    return maximumStake;
  }
  
  const { t } = useTranslation();
  return (
    <Grid className={classes.root} container>
      <Grid className={classes.mainContainer} container spacing={1}>
        {ticket.bets.map((bet, index) => {
          return (
            <Grid item xs={12} key={index}>
              <Paper className={!bet.invalid ? classes.betContainer : `${classes.betContainer} ${classes.invalidBet}`} elevation={3}>
                <div style={{ display: 'flex' }}>
                  <Typography
                    style={{ flexGrow: 1, color: mainTheme.palette.text.primary }}
                    variant="subtitle1"
                    onClick={() => {
                      handleSelectedBalls(bet.gameType, bet.bet);
                    }}
                  >
                    {bet.bet.toString()}
                  </Typography>
                  {!checkEditing(index) ? (
                    <IconButton
                      onClick={() => {
                        handleSelectedBalls(bet.gameType, bet.bet);
                        setCurrentlyEditing(index, true);
                      }}
                      style={{ padding: '0', color: mainTheme.palette.text.primary }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        handleBet(index, true);
                        setCurrentlyEditing(index, false);
                        openNotification({
                          message: 'ViewEditedTab',
                          isOpen: true,
                          severity: 'success',
                          duration: 3000,
                        });
                      }}
                      style={{ padding: '0', color: mainTheme.palette.text.primary }}
                    >
                      <DoneIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => {
                      if (checkEditing(index)) {
                        setSelectedBalls([]);
                      }
                      removeBet(index, checkEditing(index));
                      if (ticket.bets.length == 1) {
                        setSelectedBalls([]);
                      }
                    }}
                    style={{ padding: '0', color: mainTheme.palette.text.primary }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </div>

                <Typography
                  variant="subtitle1"
                  style={{ color: 'gray' }}
                  onClick={() => {
                    handleSelectedBalls(bet.gameType, bet.bet);
                  }}
                >
                  {t(bet.gameType)}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Paper style={{ padding: '5px', color: mainTheme.palette.text.primary, backgroundColor: mainTheme.palette.gray.secondary }}>
                      <Typography variant="subtitle1">
                        {game.gameInfo.phase}
                        {t('Round')}: {game.gameInfo ? (game.phase > 1 ? game.gameInfo.round + 1 : game.gameInfo.round) : 0}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper style={{ padding: '5px', color: mainTheme.palette.text.primary, backgroundColor: mainTheme.palette.gray.secondary }}>
                      <Typography variant="subtitle1">
                        {game.gameInfo.phase}
                        {t('Cycle')}: {game.gameInfo ? (game.gameInfo.round == 288 ? game.gameInfo.cycle + 1 : game.gameInfo.cycle) : 0}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper
                      style={{
                        padding: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        color: mainTheme.palette.text.primary,
                        backgroundColor: mainTheme.palette.gray.secondary,
                      }}
                    >
                      <Typography variant="subtitle1">{t('Stake')}:</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      className={classes.inputNumber}
                      type="number"
                      size="small"
                      variant="filled"
                      value={bet.stake}
                      inputProps={{
                        min: calculateMinimumBet(bet.gameType),
                        max: calculateMaximumBet(bet.gameType),
                        style: {
                          padding: '10px',
                          fontSize: '24px',
                          height: '18px',
                          textAlign: 'right',
                          backgroundColor: 'snow',
                          color: mainTheme.palette.background.secondary,
                        },
                      }}
                      onChange={(e) => handleBetStakeChange(index, e.target.value, bet.gameType)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={0} className={classes.bottomContent}>
        <Grid style={{ width: '99%', margin: 'auto' }} container spacing={1}>
          <Grid item xs={12}>
            <Paper
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'gray',
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <Typography style={{ margin: '10px' }} variant="subtitle1" className={classes.inputText}>
                    {t('FutureBet')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className={classes.inputNumber}
                    value={ticket.futureBet}
                    type="number"
                    size="medium"
                    variant="filled"
                    inputProps={{
                      min: 0,
                      max: 10,
                      style: {
                        padding: '10px',
                        fontSize: '24px',
                        textAlign: 'right',
                        backgroundColor: 'snow',
                        color: mainTheme.palette.background.secondary,
                      },
                    }}
                    onChange={(e) => handleFutureBetChange(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'gray',
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <Typography style={{ margin: '10px' }} variant="subtitle1" className={classes.inputText}>
                    {t('TotalStake')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={ticket.totalStake}
                    onChange={handleChangeTotalStake}
                    className={classes.inputNumber}
                    type="number"
                    size="small"
                    variant="filled"
                    inputProps={{
                      min: 0,
                      max: 5000,
                      style: {
                        padding: '10px',
                        fontSize: '24px',
                        textAlign: 'right',
                        backgroundColor: 'snow',
                        color: mainTheme.palette.background.secondary,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.defaultStakeContainer}>
          {defaultBets.map((bet) => {
            return (
              <Grid key={bet} item xs={2} style={{ padding: '0 2px' }}>
                <Button
                  className={classes.defaultStake}
                  onClick={() => {
                    handleChangeDefaultStake(bet);
                  }}
                  variant="contained"
                  color="primary"
                >
                  {t(`${bet}`)}
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <Grid style={{ width: '99%', margin: 'auto' }} container spacing={1}>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                clearTicket();
                setSelectedBalls([]);
              }}
              disabled={!ticket.bets.length}
              className={classes.cancelButton}
            >
              <DeleteOutlineIcon />
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button onClick={handleTicketSubmit} className={classes.payButton} variant="contained">
              <ReceiptIcon /> {t('PayIN')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

BetContainer.propTypes = {
  removeBet: PropTypes.func.isRequired,
  updateBet: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  game: PropTypes.object,
  payInTicket: PropTypes.func.isRequired,
  getCurrentBalance: PropTypes.func.isRequired,
  clearTicket: PropTypes.func.isRequired,
  updateTicketStake: PropTypes.func.isRequired,
  setFutureBet: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  handleBet: PropTypes.func.isRequired,
  setCurrentlyEditing: PropTypes.func.isRequired,
  setSelectedBalls: PropTypes.func.isRequired,
  setInvalidBet: PropTypes.func.isRequired,
  marketplace: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ticket: state.ticket,
    player: state.player,
    game: state.game,
    selectedGame: state.currentBet.selectedGame,
    selectedBet: state.currentBet.selectedBet,
    currentlyEditing: state.ticket.currentlyEditing,
    marketplace: state.marketplace,
  };
}

const mapDispatchToProps = {
  removeBet,
  updateBet,
  payInTicket,
  getCurrentBalance,
  getTicketHistory,
  clearTicket,
  updateTicketStake,
  setFutureBet,
  openNotification,
  setCurrentlyEditing,
  setSelectedBalls,
  setInvalidBet,
};

export default connect(mapStateToProps, mapDispatchToProps)(BetContainer);
