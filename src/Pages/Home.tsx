import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { getLoginStatus } from '../app/store';
import Titlebar from '../components/Titlebar';

let Home: React.FC<{}> = function (props) {
  const isLoggedIn = useSelector(getLoginStatus);
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }
  return <section id="home" className="container-fluid">
    <Titlebar title={'Home'} />
    <p>Home</p>
  </section>;
}

export default Home;