import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Home from './components/Home';
import Month from './components/Month';
import Navbar from './components/Nav';
import Year from './components/Year';
import { getTheme, change } from './app/reducers/themeReducer';
import THEMES, { ifTheme } from './app/constants/Themes';
import { themeType } from './app/constants/Types';

function App() {
  const theme = useSelector(getTheme);
  const globalTheme = {
    '--pr-color': theme.prColor,
    '--sec-color': theme.secColor,
    '--font-pr-color': theme.fontPrColor,
    '--font-sec-color': theme.fontSecColor,
  } as React.CSSProperties;

  const dispatch = useDispatch();
  let handleThemeChange = function (key: string) {
    let newTheme = THEMES[key];
    console.log(newTheme);
    dispatch(change(newTheme));
  }

  return (
    <div className="App" style={globalTheme}>
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <main className="App-main">
          <Switch>
            <Route path="/annual">
              <div className="row">
                <h1 className="hc-text">Annual</h1>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Year />
            </Route>
            <Route path="/monthly">
              <div className="row">
                <h1 className="hc-text">Month</h1>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Month />
            </Route>
            <Route path="/">
              <div className="row">
                <h1 className="hc-text">Home</h1>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Home />
            </Route>
          </Switch>
        </main>

      </Router>
    </div>
  );
}

let ThemePopup: React.FC<{ themes: ifTheme, cb: (key: string) => void }> = function ThemePopup(props) {
  let themes: themeType[] = [];
  for (let t in props.themes) {
    themes.push(props.themes[t]);
  }
  return <div id="theme-btn" className="has-dropdown">
    <button className="icon-btn">
      <FontAwesomeIcon icon={faPalette} className="icon lg"></FontAwesomeIcon>
    </button>
    <ul className="dropdown">
      {
        themes.map(t => <li key={t.key}>
          <button style={{ color: t.secColor }}
            className="icon-btn"
            onClick={e => props.cb(t.key)}>{t.label}</button>
        </li>)
      }
    </ul>
  </div>;
}

export default App;
