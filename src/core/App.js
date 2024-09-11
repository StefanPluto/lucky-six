import React from "react";
import i18n from "../localization/i18n";
import { InitializeWss } from "./components/webSocketServer/wss";
import ThemedApp from "./ThemedApp";

function App() {
  if (window.localStorage.getItem("tutorialWatched") !== "true") {
    window.localStorage.setItem("tutorialWatched", false);
  }
  InitializeWss();
  return <ThemedApp />;
}

export default App;
