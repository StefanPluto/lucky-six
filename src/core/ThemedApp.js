import React, { useEffect, useState } from 'react';
import i18n from '../localization/i18n';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LuckySix from './components/luckySix/LuckySix';
import { mainTheme, setTheme } from './components/theme/themes';
import { getTicketHistory, logIn } from './components/player/state/playerActions';
import { InitializeWss } from './components/webSocketServer/wss';
import { createTheme } from '@material-ui/core';

const checkLocation = () => {
  let locationData = {};
  location.href
    .split('?')[1]
    .split('&')
    .forEach((data) => {
      let property = data.split('=');
      locationData[`${property[0]}`] = property[1];
    });
  return locationData;
};

function ThemedApp({ logIn, getTicketHistory }) {
  const [muiTheme, setMuiTheme] = useState(createTheme(mainTheme));
  useEffect(async () => {
    let locationData = null;
    locationData = checkLocation();
    if (locationData.primaryColor !== null && locationData.secondaryColor !== null) {
      setTheme(locationData.primaryColor, locationData.secondaryColor)
      setMuiTheme(createTheme(mainTheme))
    }
    if (locationData.token !== null) {
      localStorage.setItem('token', locationData.token);
      await logIn(locationData);
      await getTicketHistory();
    }
  }, []);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <LuckySix retailMode={false} />}
        />
        <Route
          exact
          path="/game-animation"
          component={() => <LuckySix retailMode={true} />}
        />
      </Switch>
    </MuiThemeProvider>
  );
}

ThemedApp.propTypes = {
  darkThemeEnabled: PropTypes.bool.isRequired,
  logIn: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    darkThemeEnabled: state.darkThemeEnabled,
  };
}

const mapDispatchToProps = {
  logIn,
  getTicketHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemedApp);
