export default {
  darkThemeEnabled: true,
  game: {
    gameInfo: null,
    data: null,
    phase: 0,
    timeLeft: 0,
    retailMode: false,
  },
  statistics: {
    firstBallEvenPercentage: 0,
    firstBallOddPercentage: 0,
    firstBallOver24Percentage: 0,
    firstBallUnder24Percentage: 0,
    firstFiveBallsOver122Percentage: 0,
    firstFiveBallsUnder122Percentage: 0,
    firstFiveEvenPercentage: 0,
    firstFiveOddPercentage: 0,
  },
  currentGameStatistics: {
    ballColors: {
      red: 0,
      green: 0,
      blue: 0,
      purple: 0,
      brown: 0,
      yellow: 0,
      orange: 0,
      gray: 0,
    },
    firstFiveSum: 0,
    firstFiveOdd: 0,
    firstFiveEven: 0,
  },
  notification: {
    message: "",
    isOpen: false,
    severity: "success",
    duration: 3000,
  },
  selectedTab: {
    firstTab: 0,
    secondTab: 0,
    thirdTab: 0,
    mobileTab: 0,
    viewScreen: 0,
  },
  history: [],
  player: {},
  marketplace: {
    currency: "",
    maximumStakePerBet: 100,
    maximumTotalStake: 2000,
    minimumStakePerBet: 50,
    minimumTotalStake: 50,
    minimumStakePerCombination: 14,
    maximumStakePerCombination: 80,
  },
  ticket: {
    bets: [],
    futureBet: 1,
    totalStake: 0,
    currentlyEditing: "",
  },
  currentBet: {
    selectedGame: "",
    selectedBet: "",
    selectedBalls: [],
    selectedFirstBallColor: [],
  },
};
