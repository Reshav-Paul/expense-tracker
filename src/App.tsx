import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Home from './components/Home';
import Month from './components/Month';
import Navbar from './components/Nav';
import Year from './components/Year';
import { getTheme } from './app/reducers/themeReducer';
import THEMES from './app/constants/Themes';
import ThemePopup from './components/ThemePopup';

function App() {
  const theme = useSelector(getTheme);
  const globalTheme = {
    '--pr-color': theme.prColor,
    '--sec-color': theme.secColor,
    '--font-pr-color': theme.fontPrColor,
    '--font-sec-color': theme.fontSecColor,
  } as React.CSSProperties;

  return (
    <div className="App" style={globalTheme}>
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <main className="App-main py-3">
          <Switch>
            <Route path="/annual">
              <div className="container-fluid">
                <div className="row">
                  <h3 className="hc-text col-10">Annual</h3>
                  <ThemePopup themes={THEMES} />
                </div>
              </div>
              <Year />
            </Route>
            <Route path="/monthly">
              <Month />
            </Route>
            <Route path="/">
              <div className="container-fluid">
                <div className="row">
                  <h3 className="hc-text col-10">Home</h3>
                  <ThemePopup themes={THEMES} />
                </div>
              </div>
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}



export default App;
