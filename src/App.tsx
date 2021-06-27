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
        <main className="App-main container-fluid py-3">
          <Switch>
            <Route path="/annual">
              <div className="row">
                <h3 className="hc-text col-10">Annual</h3>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Year />
            </Route>
            <Route path="/monthly">
              <div className="row">
                <h3 className="hc-text col-10">Month</h3>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Month />
            </Route>
            <Route path="/">
              <div className="row">
                <h3 className="hc-text col-10">Home</h3>
                <ThemePopup themes={THEMES} cb={handleThemeChange} />
              </div>
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
      {/* <form id="budgetFormDialog" className="center-form dp06 invisible">
        <div className="d-flex jc-between ai-center mb-4">
          <h5>Add Budget</h5>
          <FontAwesomeIcon icon={faTimes} className="icon lg"></FontAwesomeIcon>
        </div>
        <div>
          <label htmlFor="budget-month" className="mr-3">Month</label>
          <select name="budget-month" id="budget-month" className="mb-3">
            {
              monthInputOptions.map(o => {
                return <option value={o.value} key={o.value}>{o.text}</option>
              })
            }
          </select>
        </div>
        <div className="d-flex jc-between">
          <label htmlFor="budget-year" className="mr-3">Year</label>
          <select name="budget-year" id="budget-year" className="mb-3">
            {
              yearInputOptions.map(o => {
                return <option value={o} key={o}>{o}</option>
              })
            }
          </select>
        </div>
        <button className="btn as-center">Add</button>
      </form> */}
    </div>
  );
}

let ThemePopup: React.FC<{ themes: ifTheme, cb: (key: string) => void }> = function ThemePopup(props) {
  let themes: themeType[] = [];
  for (let t in props.themes) {
    themes.push(props.themes[t]);
  }
  return <div id="theme-btn" className="has-dropdown col-2 text-right">
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
