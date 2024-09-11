import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: '10px 0px',
    backgroundColor: theme.palette.background.primary,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'left',
    alignItems: 'center',
  },
  allBets: {
    width: '100%'
  },
  betInfo: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    marginBottom: '10px',
    padding: '16px',
    alignItems: 'center',
    justifyContent: 'left',
    width: '90%',
    borderRadius: '10px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  },
  betInfoContent: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.background.secondary}`,
    borderLeft: `1px solid ${theme.palette.background.secondary}`,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15px',
    padding: '10px',
    borderRadius: '8px',
    justifyContent: 'space-between',
  },
  betInfoText: {
    marginTop: '7px',
    color: `${theme.palette.background.secondary}`,
  },
  active: {
    backgroundColor: theme.palette.background.primary,
    maxHeigh: '20px',
  },
  prevBets: {
    padding: '0 18px',
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'maxHeight 0.2s ease-out',
  },
  topSection: {
    overflowY: 'auto',
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
    marginBottom: '40px',
  },
  details: {
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.background.secondary}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    width: '100%',
  },
}));

function TicketHistory({ player }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showBets, setShowBets] = useState(false);
  const [position, setPosition] = useState(1);

  const collapse = () => {
    setShowBets(!showBets);
  };
  const handleChangePage = (e, value) => {
    setPosition(value);
  };


  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        {player.ticketHistory? player.ticketHistory.data
          .slice(position - 1, position)
          .map((ticket, index) => (
            <div key={index}>
              <div className={classes.section}>
                <Paper elevation={2} className={classes.betInfo}>
                  <Accordion className={classes.allBets}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreRoundedIcon style={{ color: '#EC671B' }} />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ display: 'inline-flex', width: '100%' }}
                    >
                      <div>
                        <b>{t('ViewAllBets')}</b>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                      {ticket.bets.map((bet, index) => {
                        return (
                          <div key={index} className={classes.betInfoContent}>
                            <div className={classes.betInfoText}>
                              <p>
                                <b>{t('GameType')}: </b> {t(bet.gameType)}{' '}
                              </p>
                            </div>
                            <div className={classes.betInfoText}>
                              <p>
                                <b>{t('Bet')}: </b>
                                {Array.isArray(bet.bet)
                                  ? bet.bet.join(', ')
                                  : bet.bet}
                              </p>
                            </div>
                            <div className={classes.betInfoText}>
                              <p>
                                <b>{t('Stake')}: </b>
                                {bet.stake}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </div>

              <div className={classes.section}>
                <Paper elevation={2} className={classes.betInfo}>
                  <div style={{ color: '#ec671b' }}>
                    {t('CreatedAt')}:{' '}
                    {new Date(ticket.createdAt).toLocaleString('en-UK')}
                  </div>
                </Paper>
                <Paper elevation={2} className={classes.betInfo}>
                  <div style={{ color: '#ec671b' }}>
                    {t('TotalStake')}: {ticket.totalStake}
                  </div>
                </Paper>
                <Paper elevation={2} className={classes.betInfo}>
                  <div style={{ color: '#ec671b' }}>
                    {t('TotalWonAmount')}: {ticket.totalWonAmount}
                  </div>
                </Paper>
              </div>
            </div>
          )) : ''}
      </div>
      <div
        className={classes.section}
        style={{ position: 'absolute', bottom: '5px' }}
      >
        <Pagination count={10} variant="outlined" onChange={handleChangePage} />
      </div>
    </div>
  );
}

TicketHistory.propTypes = {
  player: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    player: state.player,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TicketHistory);
