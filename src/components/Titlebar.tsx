import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import THEMES from "../app/constants/Themes";
import { getLoginStatus } from "../app/store";
import ThemePopup from "./ThemePopup";

const Titlebar: React.FC<{ title: string }> = function (props) {
  const isLoggedIn = useSelector(getLoginStatus);
  const history = useHistory();
  function openUserPage() {
    if (!isLoggedIn) {
      history.replace('/login');
    }
    history.push('/profile')
  }
  return <div className="row">
    <h4 className="hc-text col-10">{props.title}</h4>
    <div className="col-2 d-flex jc-end">
      <button className="bg-pr">
        <FontAwesomeIcon icon={faUser} className="icon lg" onClick={e => openUserPage()}></FontAwesomeIcon>
      </button>
      <ThemePopup themes={THEMES} />
    </div>
  </div>;
}

export default Titlebar;