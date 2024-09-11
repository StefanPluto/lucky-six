import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GameAnimation from "../game/gameAnimation";
import {
  STATISTICS_TAB,
  HISTORY_TAB,
  BETTING_TAB,
  TICKETS_TAB,
  TICKETS_HISTORY_TAB,
} from "../bettingMenu/enums";
import { makeStyles } from "@material-ui/core/styles";
import BettingMenu from "../bettingMenu/bettingSection";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Media } from "react-breakpoints";

import {
  openNotification,
  closeNotification,
} from "../notification/state/notificationActions";
import {
  changeFirstTab,
  changeSecondTab,
  changeThirdTab,
  changeMobileTab,
  changeViewScreen,
} from "../state/luckySixActions";
import { BOTTOM, LEFT, MIDDLE, NONE, RIGHT } from "./enums";
import { getCurrentTutorialTab } from "./LuckySixFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.primary,
  },
  snackbarStyle: {
    backgroundColor: "#d4af37",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  statisticsContainer: {
    padding: "5px 30px 5px 30px",
    backgroundColor: "#3b3b3b",
  },
  bettingContainer: {
    display: "flex",
    flexDirection: "column",
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    width: "100%",
    height: "33vw",
  },
  gameContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tickets: {
    width: "100%",
    height: "100%",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function LuckySix({
  selectedTab,
  changeFirstTab,
  changeSecondTab,
  changeThirdTab,
  changeMobileTab,
  retailMode,
  notification,
  closeNotification,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [mouseClick, setMouseClick] = useState(0);
  const [highlightedSection, setHighLightedSection] = useState(NONE);
  const [tutorialRunning, setTutorialRunning] = useState(
    window.localStorage.getItem("tutorialWatched") === "true" ? false : true
  );
  const [tutorialMessageData, setTutorialMessageData] = useState({
    showMessage:
      window.localStorage.getItem("tutorialWatched") === "true" ? false : true,
    message:
      window.localStorage.getItem("tutorialWatched") === "true"
        ? ""
        : "TutorialMessage0",
  });

  const mouseClicked = (isMobile) => {
    if (!tutorialRunning) return;
    switch (mouseClick + 1) {
      case 1:
        setHighLightedSection(isMobile ? MIDDLE : LEFT);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: isMobile ? "TutorialMessage3" : "TutorialMessage1",
        });
        break;
      case 2:
        setHighLightedSection(isMobile ? BOTTOM : LEFT);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: isMobile ? "TutorialMessage6" : "TutorialMessage2",
        });
        changeFirstTab(1);
        break;
      case 3:
        setHighLightedSection(isMobile ? BOTTOM : BOTTOM);
        changeMobileTab(isMobile ? 1 : 0);
        changeFirstTab(0);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: isMobile ? "TutorialMessage1" : "TutorialMessage6",
        });
        break;
      case 4:
        setHighLightedSection(isMobile ? BOTTOM : RIGHT);
        changeMobileTab(isMobile ? 2 : 0);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: "TutorialMessage4",
        });
        break;
      case 5:
        setHighLightedSection(isMobile ? BOTTOM : RIGHT);
        changeMobileTab(isMobile ? 3 : 0);
        changeSecondTab(1);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: isMobile ? "TutorialMessage2" : "TutorialMessage5",
        });
        break;
      case 6:
        setHighLightedSection(isMobile ? BOTTOM : MIDDLE);
        changeMobileTab(isMobile ? 4 : 0);
        changeSecondTab(0);
        setTutorialMessageData({
          ...tutorialMessageData,
          message: isMobile ? "TutorialMessage5" : "TutorialMessage3",
        });
        break;
      default:
        setHighLightedSection("");
        changeMobileTab(0);
        setTutorialRunning(false);
        window.localStorage.setItem("tutorialWatched", true);
        setTutorialMessageData({
          showMessage: false,
          message: "",
        });
        break;
    }
    setMouseClick(mouseClick + 1);
  };
  return (
    <div
      onClick={() => mouseClicked(selectedTab.viewScreen === 1 ? true : false)}
      className={classes.root}
    >
      <CssBaseline />
      <div className={classes.gameContainer}>
        <div className={classes.bettingContainer}>
          <Media>
            {({ breakpoints, currentBreakpoint }) =>
              breakpoints[currentBreakpoint] >= breakpoints.desktop &&
              !retailMode ? (
                <>
                  <div className={classes.topContent}>
                    <div
                      style={getCurrentTutorialTab(
                        LEFT,
                        highlightedSection,
                        tutorialRunning
                      )}
                      className={classes.statHistory}
                    >
                      <BettingMenu
                        selectedTab={selectedTab.firstTab}
                        changeSelectedTab={changeFirstTab}
                        resized={0}
                        sections={[STATISTICS_TAB, HISTORY_TAB]}
                      />
                    </div>
                    <div
                      style={getCurrentTutorialTab(
                        MIDDLE,
                        highlightedSection,
                        tutorialRunning
                      )}
                      className={classes.gameContent}
                    >
                      <GameAnimation retailMode={retailMode} />
                    </div>
                    <div
                      style={getCurrentTutorialTab(
                        RIGHT,
                        highlightedSection,
                        tutorialRunning
                      )}
                      className={classes.tickets}
                    >
                      <BettingMenu
                        selectedTab={selectedTab.secondTab}
                        changeSelectedTab={changeSecondTab}
                        resized={0}
                        sections={[TICKETS_TAB, TICKETS_HISTORY_TAB]}
                      />
                    </div>
                  </div>
                  <div
                    style={getCurrentTutorialTab(
                      BOTTOM,
                      highlightedSection,
                      tutorialRunning
                    )}
                  >
                    <BettingMenu
                      selectedTab={selectedTab.thirdTab}
                      changeSelectedTab={changeThirdTab}
                      resized={0}
                      sections={[BETTING_TAB]}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={getCurrentTutorialTab(
                      MIDDLE,
                      highlightedSection,
                      tutorialRunning
                    )}
                  >
                    <GameAnimation retailMode={retailMode} />
                  </div>
                  <div
                    style={getCurrentTutorialTab(
                      BOTTOM,
                      highlightedSection,
                      tutorialRunning
                    )}
                  >
                    {!retailMode ? (
                      <BettingMenu
                        selectedTab={selectedTab.mobileTab}
                        changeSelectedTab={changeMobileTab}
                        resized={1}
                        sections={[
                          BETTING_TAB,
                          STATISTICS_TAB,
                          TICKETS_TAB,
                          HISTORY_TAB,
                          TICKETS_HISTORY_TAB,
                        ]}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={notification.duration}
        onClose={closeNotification}
      >
        <Alert onClose={closeNotification} severity={notification.severity}>
          {t(notification.message)}
        </Alert>
      </Snackbar>
      <Snackbar
        open={tutorialMessageData.showMessage}
        message={<span id="message-id">{t(tutorialMessageData.message)}</span>}
        ContentProps={{
          "aria-describedby": "message-id",
          className: classes.snackbarStyle,
        }}
      ></Snackbar>
    </div>
  );
}

LuckySix.propTypes = {
  retailMode: PropTypes.bool.isRequired,
  notification: PropTypes.object.isRequired,
  openNotification: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired,
  selectedTab: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    notification: state.notification,
    selectedTab: state.selectedTab,
  };
}

const mapDispatchToProps = {
  openNotification,
  closeNotification,
  changeFirstTab,
  changeSecondTab,
  changeThirdTab,
  changeMobileTab,
  changeViewScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(LuckySix);
