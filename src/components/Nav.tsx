import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faChartArea, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

let SideBar: React.FC<{}> = function (props) {
  const location = useLocation();
  let collapse = function () {
    document.getElementById('App-Sidebar')?.classList.toggle('collapsed');
  }

  if (location.pathname === '/login') return null;
  if (location.pathname === '/register') return null;

  return <div id="App-Sidebar">
    <h5>
      <FontAwesomeIcon icon={faBars}
        onClick={e => collapse()}
        className="icon lg mr-2"></FontAwesomeIcon>
      <span className="sidebar-label font-sec" style={{ paddingLeft: '0.4rem' }}>ExSpender</span>
    </h5>
    <Link to='/' className={'sidebar-item ' + (location.pathname === '/home' ? 'selected' : '')}>
      <FontAwesomeIcon icon={faHome} className="icon lg mr-2"></FontAwesomeIcon>
      <span className="sidebar-label">Home</span>
    </Link>
    <Link to='/monthly' className={'sidebar-item ' + (location.pathname === '/monthly' ? 'selected' : '')}>
      <FontAwesomeIcon icon={faChartArea} className="icon lg mr-2"></FontAwesomeIcon>
      <span className="sidebar-label">Monthly</span>
    </Link>
    <Link to='/annual' className={'sidebar-item ' + (location.pathname === '/annual' ? 'selected' : '')}>
      <FontAwesomeIcon icon={faChartLine} className="icon lg mr-2"></FontAwesomeIcon>
      <span className="sidebar-label">Annual</span>
    </Link>
  </div>;
}

export default SideBar;