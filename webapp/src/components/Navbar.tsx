import React from "react";
import { Link, useLocation } from "react-router-dom";

let Navbar: React.FC<{}> = function (props) {
  const path = useLocation().pathname;

  return <nav id='navbar' className="mb-2 pt-2 px-3">
    <div className="d-flex ai-center">
      <div className="">
        <Link className="fc-primary" to={'/'}>
          <h5 className="fw-bold">ExSpender</h5>
        </Link>
      </div>
      <ul className="d-flex ai-center li-none mb-2 ml-5 ml-md-3 ml-sm-0">
        <li className="nav-link">
          {
            path === '/budgets'
              ? <span className="selected">Budgets</span>
              : <Link className="int-link" to={'/budgets'}>Budgets</Link>
          }
        </li>
        <li className="nav-link">
          {
            path === '/expenses'
              ? <span className="selected">Expenses</span>
              : <Link className="int-link" to={'/expenses'}>Expenses</Link>
          }
        </li>
      </ul>
      <div className="text-right nav-link mb-2 ml-auto">
        {
          path === '/profile'
            ? <span className="selected">Profile</span>
            : <Link className="int-link" to={'/profile'}>Profile</Link>
        }
      </div>
    </div>
  </nav>
}

export default Navbar;