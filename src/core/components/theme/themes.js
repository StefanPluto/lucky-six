export let mainTheme = {
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: '1.5vw',
        '@media (max-width:1279px)': {
          fontSize: '3vw',
        },
        fontWeight: 800,
      },
      h6: {
        fontSize: '1.5vw',
        '@media (max-width:1279px)': {
          fontSize: '4vw',
        },
        fontWeight: 100,
      },
      subtitle1: {
        '@media (max-width:1279px)': {
          fontSize: '18px',
        },
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: '1vw',
        '@media (max-width:1279px)': {
          fontSize: '2vw',
        },
        fontWeight: 400,
      },
    },
  },
  palette: {
    type: 'dark',
    header: {
      primary: '#ff5e00',
      secondary: '#EC671B'
    },
    footer: '#ff5e00',
    outline: '#ffffff',
    hole: {
      fill: '#000000',
      outline: '#424242'
    },
    background: {
      primary: '#212121',
      secondary: '#EC671B',
      contrast: '#383838'
    },
    gray: {
      primary: '#4d4d4d',
      secondary: '#808080',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#000000',
    },
    ball: {
      red: '#ff1414',
      green: '#32a852',
      blue: '#3784db',
      purple: '#a72ac7',
      brown: '#945a28',
      yellow: '#fff200',
      orange: '#ffb914',
      black: '#bfbfbf',
    },
    bonusStar: {
      yellow: '#ffff33',
    },
  },
};

export const setTheme = (primaryColor, secondaryColor) => {
  mainTheme.palette.header.primary = primaryColor;
  mainTheme.palette.header.secondary = secondaryColor;
  mainTheme.palette.footer = primaryColor;
  mainTheme.palette.background.secondary = secondaryColor;
  console.log(mainTheme)
}
