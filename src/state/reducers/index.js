import { combineReducers } from 'redux';
import game from '../../core/components/game/state/gameReducer';
import statistics from '../../core/components/bettingMenu/statisticsTab/state/statisticsReducer';
import currentGameStatistics from '../../core/components/footer/state/currentGameStatisticsReducer';
import ticket from '../../core/components/bettingMenu/ticketTab/state/betReducer';
import player from '../../core/components/player/state/playerReducer';
import marketplace from '../../core/components/marketplace/state/marketplaceReducer';
import history from '../../core/components/bettingMenu/historyTab/state/historyReducer';
import notification from '../../core/components/notification/state/notificationReducer';
import darkThemeEnabled from '../../theme/state/themeReducer';
import currentBet from '../../core/components/bettingMenu/bettingTab/state/currentBetReducer';
import selectedTab from '../../core/components/state/luckySixReducer';

const rootReducer = combineReducers({
  darkThemeEnabled,
  ticket,
  player,
  marketplace,
  game,
  statistics,
  currentGameStatistics,
  history,
  notification,
  currentBet,
  selectedTab,
});

export default rootReducer;
