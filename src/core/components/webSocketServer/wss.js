import { io } from 'socket.io-client';
import { updateGameData } from '../game/state/gameActions';
import { updateCurrentGameStatistics } from '../footer/state/currentGameStatisticsActions';
import { updateStatistics } from '../bettingMenu/statisticsTab/state/statisticsActions';
import { updateHistory } from '../bettingMenu/historyTab/state/historyActions';
import { useDispatch } from 'react-redux';

const socket = io('wss://casino-api.instantbet.me:442/');
// const socket = io('ws://localhost:8080/')

export const InitializeWss = () => {
  console.log('done')
  const dispatch = useDispatch();

  socket.on('connect', () => {
    console.log('Connected to the lucky balls API');
  });

  socket.on('gameChanged', (message) => {
    console.log(JSON.parse(message))
    dispatch(updateGameData(JSON.parse(message)));
  });

  socket.on('currentGameStatisticsChanged', (message) => {
    dispatch(updateCurrentGameStatistics(JSON.parse(message)));
  });

  socket.on('statisticsChanged', (message) => {
    dispatch(updateStatistics(JSON.parse(message)));
  });

  socket.on('historyChanged', (message) => {
    dispatch(updateHistory(JSON.parse(message)));
  });
};
