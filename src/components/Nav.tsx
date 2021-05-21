import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faChartArea, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

let Navbar: React.FC<{}> = function Navbar(props) {
    const location = useLocation();
    let navCollapse = function() {
        document.getElementById('App-nav')?.classList.toggle('collapsed');
    }

    return <nav id="App-nav">
        <h3>
            <FontAwesomeIcon icon={faBars} 
                onClick = {e => navCollapse()}
                className="icon lg mr-2"></FontAwesomeIcon>
            <span className="nav-label font-sec" style={{paddingLeft: '0.4rem'}}>ExSpender</span>
        </h3>
        <Link to='/' className= {'nav-item ' + (location.pathname === '/'? 'selected' : '')}>
            <FontAwesomeIcon icon={faHome} className="icon lg mr-2"></FontAwesomeIcon>
            <span className="nav-label">Home</span>
        </Link>
        <Link to='/monthly' className={'nav-item ' + (location.pathname === '/monthly'? 'selected' : '')}>
            <FontAwesomeIcon icon={faChartArea} className="icon lg mr-2"></FontAwesomeIcon>
            <span className="nav-label">Monthly</span>
        </Link>
        <Link to='/annual' className={'nav-item ' + (location.pathname === '/annual'? 'selected' : '')}>
            <FontAwesomeIcon icon={faChartLine} className="icon lg mr-2"></FontAwesomeIcon>
            <span className="nav-label">Annual</span>
        </Link>
    </nav>;
}

export default Navbar;