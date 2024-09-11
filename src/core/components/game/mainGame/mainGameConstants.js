export const drumPositions = [
  [35.5, 18.5],
  [33.5, 25.6],
  [32.5, 33],
  [33.3, 40.8],
  [35.1, 48.2],
];
export const drumFillPositions = [
  {
    x: 62.9,
    y: 16.6,
    width: 0.95,
    animationDelay: "0.3s"
  },
  {
    x: 63.9,
    y: 18.7,
    width: 1.1,
    animationDelay: "0.1s"
  },
  {
    x: 64.6,
    y: 20.6,
    width: 1.8,
    animationDelay: "0s"
  },
  {
    x: 65.7,
    y: 24,
    width: 1.1,
    animationDelay: "0.1s"
  },
  {
    x: 66.3,
    y: 26.7,
    width: 0.95,
    animationDelay: "0.3s"
  }
]
export const holeText = [
  '10.000',
  '7.500',
  '5.000',
  '2.500',
  '1.000',
  500,
  300,
  200,
  150,
  100,
  90,
  80,
  70,
  60,
  50,
  40,
  30,
  25,
  20,
  15,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
];
export const columnPositions = [5, 23, 41, 57, 73, 89];

export let generateHolePositions = () => {
  let tempHolePositions = [];
  for (let i = 0; i < 6; i++) {
    let wasRowSkipped = false;
    for (let j = 1; j < 10; j++) {
      if (i !== 0 && i !== 5) {
        if (!wasRowSkipped) {
          j = 7;
          wasRowSkipped = true;
        }
      }
      tempHolePositions.push({
        position: [columnPositions[i], j * 10],
        wasBallChosen: false,
      });
    }
  }
  return tempHolePositions;
};
