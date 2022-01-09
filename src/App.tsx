import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Home from './Pages/Home';
import Month from './Pages/Month';
import SideBar from './components/Nav';
import Year from './Pages/Year';
import { getTheme } from './app/store';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

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
        <section className="App-header">
          <SideBar />
        </section>
        <main className="App-main py-3">
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path="/annual">
              <Year />
            </Route>
            <Route path="/monthly">
              <Month />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}



export default App;

