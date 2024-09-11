import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import BallGroup from "./bettingTab/standardGame";
import ExtraGames from "./bettingTab/extraGames";
import Statistics from "./statisticsTab/statisticsSection";
import Tickets from "./ticketTab/betContainer";
import History from "./historyTab/historySection";
import TicketHistory from "./ticketHistoryTab/ticketHistorySection";
import {
  STATISTICS_TAB,
  HISTORY_TAB,
  BETTING_TAB,
  TICKETS_TAB,
  TICKETS_HISTORY_TAB,
} from "./enums";
import {
  addBetSuccess,
  setCurrentlyEditing,
} from "./ticketTab/state/betActions";
import {
  setSelectedBet,
  setSelectedGame,
  setSelectedBalls,
  setSelectedFirstBallColor,
} from "./bettingTab/state/currentBetActions";
import { openNotification } from "../notification/state/notificationActions";
import CasinoIcon from "@material-ui/icons/Casino";
import ReceiptIcon from "@material-ui/icons/Receipt";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HistoryIcon from "@material-ui/icons/History";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import { changeViewScreen } from "../state/luckySixActions";

function TabPanel(props) {
  const { children, value, index, isBetting, ...other } = props;
  const useStyles = makeStyles((theme) => ({
    main: {
      height: "auto",
      width: "100%",
      padding: "10px",
      backgroundColor: theme.palette.background.primary,
      "@media (min-width: 1280px)": {
        height: "30vw",
      },
    },
    mainBetting: {
      height: "auto",
      width: "100%",
      padding: "10px",
      backgroundColor: theme.palette.background.primary,
    },
  }));
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={isBetting ? classes.mainBetting : classes.main}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isBetting: PropTypes.bool,
  currentlyEditing: PropTypes.string,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

let automaticBetCounter = 0;

function BettingMenu({
  addBetSuccess,
  openNotification,
  setSelectedGame,
  setSelectedBet,
  selectedGame,
  selectedBet,
  setSelectedFirstBallColor,
  setSelectedBalls,
  selectedBalls,
  selectedFirstBallColor,
  sections,
  resized,
  marketplace,
  currentlyEditing,
  selectedTab,
  changeSelectedTab,
  changeViewScreen,
}) {
  const useStyles = makeStyles((theme) => ({
    mainContainer: {
      height: "100%",
      display: "flex",
      backgroundColor: theme.palette.background.primary,
      padding: "10px",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        height: "auto",
      },
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
    },
    createBetButton: {
      "&:focus": {
        outline: "none",
      },
      backgroundColor: theme.palette.background.contrast,
      color: theme.palette.text.primary,
      marginTop: "10px",
    },
    standardGameSection: {
      height: "auto",
      display: "flex",
      justifyContent: "flex-start",
      width: "60%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    bar: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.header.secondary,
    },
    tab: {
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        borderBottom: `1px solid ${theme.palette.text.primary}`,
      },
      display: "flex",
      flexDirection: "row",
      color: theme.palette.text.primary,
      fontWeight: "bold",
      fontSize: "13px",
      padding: "0 8px",
      minWidth: "0",
      width: "20%",

      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
        padding: "6px 12px",
        minWidth: "10%",
        maxWidth: "auto",
        width: "auto",
      },
    },
    tabPanel: {
      padding: "0 5px",
      display: "grid",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        alignSelf: "center",
      },
    },
    tabTitle: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0",
      },
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();
  useEffect(() => {
    if (resized == 1) {
      changeSelectedTab(0);
      changeViewScreen(1);
    } else {
      changeSelectedTab(resized);
      changeViewScreen(0);
    }
  }, [resized]);

  const handleChange = (event, newValue) => {
    changeSelectedTab(newValue);
  };

  const handleClickBall = (number) => {
    if (selectedBalls.includes(number)) {
      var index = selectedBalls.indexOf(number);
      setSelectedBalls(selectedBalls.filter((ball, i) => i !== index));
    } else if (selectedBalls.length < 10) {
      setSelectedBalls([...selectedBalls, number]);
    }
    if (selectedBalls.length <= 5) {
      setSelectedGame("standard");
    } else {
      switch (selectedBalls.length) {
        case 6:
          setSelectedGame("system_6/7");
          break;
        case 7:
          setSelectedGame("system_6/8");
          break;
        case 8:
          setSelectedGame("system_6/9");
          break;
        case 9:
          setSelectedGame("system_6/10");
          break;
        default:
          break;
      }
    }
    setSelectedBet("");
  };

  const generateRandom = () => {
    var arr = [];
    while (arr.length < 6) {
      var r = Math.floor(Math.random() * 48) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    setSelectedBalls(arr);
  };

  const selectAllColors = () => {
    let balls = Array.from({ length: 49 }, (x, i) => i);
    setSelectedBalls(balls);
  };

  const handleClickGameButton = (game, value) => {
    if (game == "random") {
      generateRandom();
      setSelectedGame("standard");
    } else if (game == "allColors") {
      selectAllColors();
      setSelectedGame("allColors");
    } else if (game == "numberInFirst5" || game == "numberInLast5") {
      if (selectedBalls.length == 1) {
        setSelectedGame(game);
      } else {
        setSelectedBalls([]);
        setSelectedGame("");
        setSelectedBet("");

        openNotification({
          message: "NumberInFiveGameFailBalls",
          isOpen: true,
          severity: "warning",
          duration: 3000,
        });
      }
    } else {
      setSelectedBalls([]);
      setSelectedBet(value);
      setSelectedGame(game);
    }
    setSelectedFirstBallColor([]);
  };

  useEffect(() => {
    if (automaticBetCounter == 1) {
      if (selectedBet !== "" && selectedGame !== "") {
        handleBet();
      }
    }
    automaticBetCounter++;

    if (automaticBetCounter == 3) {
      automaticBetCounter = 0;
    }
  }, [selectedGame, selectedBet]);

  const handleChangeCheckFirstBallColor = (event) => {
    if (selectedFirstBallColor.includes(event.target.value)) {
      var index = selectedFirstBallColor.indexOf(event.target.value);
      setSelectedFirstBallColor(
        selectedFirstBallColor.filter((color, i) => i !== index)
      );
    } else if (selectedFirstBallColor.length < 4) {
      setSelectedFirstBallColor([
        ...selectedFirstBallColor,
        event.target.value,
      ]);
      setSelectedBalls([]);
      setSelectedBet("");
    } else {
      openNotification({
        message: "Max4",
        isOpen: true,
        severity: "warning",
        duration: 3000,
      });
    }

    setSelectedGame("firstBallColor");
  };

  const handleChangeSelectedColor = (event, balls) => {
    if (event.target.checked == true) {
      setSelectedBalls([]);
      setSelectedGame("standard");
      var tmpSelectedBalls = [];
      balls.forEach((ball, index) => {
        if (index % 8 == event.target.value) {
          tmpSelectedBalls.push(ball);
        }
      });
      setSelectedBalls(tmpSelectedBalls);
    } else {
      setSelectedBalls([]);
      setSelectedGame("standard");
    }
    setSelectedBet("");
    setSelectedFirstBallColor([]);
  };

  const resetState = () => {
    setSelectedGame("");
    setSelectedFirstBallColor([]);
    setSelectedBet("");
    setSelectedBalls([]);
  };

  const handleBet = (index = "", isEditing = false) => {
    if (currentlyEditing !== "") {
      isEditing = true;
      index = currentlyEditing;
    }

    if (selectedGame) {
      if (
        selectedGame == "standard" ||
        selectedGame == "system_6/7" ||
        selectedGame == "system_6/8" ||
        selectedGame == "system_6/9" ||
        selectedGame == "system_6/10"
      ) {
        if (selectedBalls.length < 6 || selectedBalls.length > 10) {
          openNotification({
            message: "StandardGameFailBalls",
            isOpen: true,
            severity: "warning",
            duration: 3000,
          });
        } else {
          let gameType = selectedGame;
          switch (selectedBalls.length) {
            case 6:
              gameType = "standard";
              break;
            case 7:
              gameType = "system_6/7";
              break;
            case 8:
              gameType = "system_6/8";
              break;
            case 9:
              gameType = "system_6/9";
              break;
            case 10:
              gameType = "system_6/10";
              break;
            default:
              break;
          }
          addBetSuccess(
            gameType,
            selectedBalls,
            index,
            isEditing,
            1,
            calculateMinimumBet(gameType)
          );
        }
      } else if (selectedGame == "random" || selectedGame == "numberInFirst5") {
        addBetSuccess(
          selectedGame,
          selectedBalls,
          index,
          isEditing,
          1,
          calculateMinimumBet(selectedGame)
        );
      } else if (selectedGame == "allColors") {
        for (let i = 1; i < 9; i++) {
          let balls = [];
          let number = i;
          for (let j = 0; j < 6; j++) {
            if (j == 0) {
              balls.push(i);
            } else {
              balls.push((number += 8));
            }
          }
          addBetSuccess(
            "standard",
            balls,
            index,
            isEditing,
            i,
            calculateMinimumBet("standard")
          );
        }
      } else if (selectedGame == "firstBallColor") {
        if (
          selectedFirstBallColor.length > 4 ||
          selectedFirstBallColor.length === 3
        ) {
          openNotification({
            message: "Select124",
            isOpen: true,
            severity: "warning",
            duration: 3000,
          });
          return;
        }
        addBetSuccess(
          selectedGame,
          selectedFirstBallColor,
          index,
          isEditing,
          1,
          calculateMinimumBet(selectedGame)
        );
      } else {
        addBetSuccess(
          selectedGame,
          selectedBet,
          index,
          isEditing,
          1,
          calculateMinimumBet(selectedGame)
        );
      }
    }
    resetState();
    if (!isEditing) {
      openNotification({
        message: "ViewTicketTab",
        isOpen: true,
        severity: "success",
        duration: 3000,
      });
    }
  };

  const calculateMinimumBet = (gameType) => {
    let minimumStake = 0;
    switch (gameType) {
      case "system_6/7":
        minimumStake = marketplace.minimumStakePerCombination * 7;
        break;
      case "system_6/8":
        minimumStake = marketplace.minimumStakePerCombination * 28;
        break;
      case "system_6/9":
        minimumStake = marketplace.minimumStakePerCombination * 84;
        break;
      case "system_6/10":
        minimumStake = marketplace.minimumStakePerCombination * 210;
        break;
      default:
        minimumStake = marketplace.minimumStakePerBet;
        break;
    }
    return minimumStake;
  };

  return (
    <Paper elevation={0}>
      <AppBar className={classes.bar} position="static">
        <Tabs
          className={classes.tabPanel}
          value={selectedTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {sections.includes(BETTING_TAB) ? (
            <Tab
              className={classes.tab}
              label={
                <div className={classes.tabTitle}>
                  <CasinoIcon
                    style={{ verticalAlign: "middle", margin: "-3px 10px 0 0" }}
                  />
                  {t("Betting")}
                </div>
              }
              {...allyProps(0)}
            />
          ) : (
            ""
          )}
          {sections.includes(STATISTICS_TAB) ? (
            <Tab
              className={classes.tab}
              label={
                <div className={classes.tabTitle}>
                  <EqualizerIcon
                    style={{ verticalAlign: "middle", margin: "-3px 10px 0 0" }}
                  />
                  {t("Statistics")}
                </div>
              }
              {...allyProps(1)}
            />
          ) : (
            ""
          )}
          {sections.includes(TICKETS_TAB) ? (
            <Tab
              className={classes.tab}
              label={
                <div className={classes.tabTitle}>
                  <ReceiptIcon
                    style={{ verticalAlign: "middle", margin: "-3px 10px 0 0" }}
                  />
                  {t("Ticket")}
                </div>
              }
              {...allyProps(2)}
            />
          ) : (
            ""
          )}
          {sections.includes(HISTORY_TAB) ? (
            <Tab
              className={classes.tab}
              label={
                <div className={classes.tabTitle}>
                  <HistoryIcon
                    style={{ verticalAlign: "middle", margin: "-3px 10px 0 0" }}
                  />
                  {t("GameHistory")}
                </div>
              }
              {...allyProps(3)}
            />
          ) : (
            ""
          )}
          {sections.includes(TICKETS_HISTORY_TAB) ? (
            <Tab
              className={classes.tab}
              label={
                <div className={classes.tabTitle}>
                  <RestorePageIcon
                    style={{ verticalAlign: "middle", margin: "-3px 10px 0 0" }}
                  />
                  {t("TicketHistory")}
                </div>
              }
              {...allyProps(3)}
            />
          ) : (
            ""
          )}
        </Tabs>
      </AppBar>
      {sections.includes(BETTING_TAB) ? (
        <TabPanel
          value={selectedTab}
          index={sections.indexOf(BETTING_TAB)}
          isBetting={true}
        >
          <Paper className={classes.mainContainer}>
            <div className={classes.standardGameSection}>
              <BallGroup
                selectedGame={selectedGame}
                selectedBalls={selectedBalls}
                handleClickBall={handleClickBall}
                handleChangeSelectedColor={handleChangeSelectedColor}
              />
            </div>
            <div>
              <ExtraGames
                selectedGame={selectedGame}
                selectedBalls={selectedBalls}
                selectedBet={selectedBet}
                selectedFirstBallColor={selectedFirstBallColor}
                handleChangeCheckFirstBallColor={
                  handleChangeCheckFirstBallColor
                }
                handleClickGameButton={handleClickGameButton}
                handleBet={handleBet}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => {
                    handleBet();
                  }}
                  disabled={!selectedGame}
                  className={classes.createBetButton}
                >
                  Add bet
                </Button>
              </div>
            </div>
          </Paper>
        </TabPanel>
      ) : (
        ""
      )}
      {sections.includes(STATISTICS_TAB) ? (
        <TabPanel value={selectedTab} index={sections.indexOf(STATISTICS_TAB)}>
          <Statistics />
        </TabPanel>
      ) : (
        ""
      )}
      {sections.includes(TICKETS_TAB) ? (
        <TabPanel value={selectedTab} index={sections.indexOf(TICKETS_TAB)}>
          <Tickets handleBet={handleBet} />
        </TabPanel>
      ) : (
        ""
      )}
      {sections.includes(HISTORY_TAB) ? (
        <TabPanel value={selectedTab} index={sections.indexOf(HISTORY_TAB)}>
          <History resized={resized} />
        </TabPanel>
      ) : (
        ""
      )}
      {sections.includes(TICKETS_HISTORY_TAB) ? (
        <TabPanel
          value={selectedTab}
          index={sections.indexOf(TICKETS_HISTORY_TAB)}
        >
          <TicketHistory />
        </TabPanel>
      ) : (
        ""
      )}
    </Paper>
  );
}

BettingMenu.propTypes = {
  addBetSuccess: PropTypes.func.isRequired,
  setSelectedGame: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  setSelectedFirstBallColor: PropTypes.func.isRequired,
  setSelectedBalls: PropTypes.func.isRequired,
  setSelectedBet: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  resized: PropTypes.number,
  selectedGame: PropTypes.string.isRequired,
  selectedBet: PropTypes.string.isRequired,
  selectedFirstBallColor: PropTypes.array.isRequired,
  selectedBalls: PropTypes.array.isRequired,
  marketplace: PropTypes.object.isRequired,
  selectedTab: PropTypes.number,
  changeSelectedTab: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    selectedGame: state.currentBet.selectedGame,
    selectedBet: state.currentBet.selectedBet,
    selectedFirstBallColor: state.currentBet.selectedFirstBallColor,
    selectedBalls: state.currentBet.selectedBalls,
    marketplace: state.marketplace,
    currentlyEditing: state.ticket.currentlyEditing,
  };
}

const mapDispatchToProps = {
  addBetSuccess,
  openNotification,
  setSelectedBet,
  setSelectedGame,
  setSelectedBalls,
  setSelectedFirstBallColor,
  setCurrentlyEditing,
  changeViewScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(BettingMenu);
