import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import profileApi from "../api/profileApi";
import { addMessage, markMessageRemoval, removeMessage } from "../app/reducers/messageReducer";
import { updateLoadingFailure, updateLoadingStart, updateLoadingSuccess } from "../app/reducers/uiLoadingReducer";
import { updateUser } from "../app/reducers/userProfileReducer";
import { getUserToken, profileUI } from "../app/store";
import Loading from "../components/Loading";
import { apiActionTypes, messageClass, messageType, messageTypes, rootThunkAction, uiLoadingClasses } from "../utilities/types";


let submitLoginForm = (email: string, password: string): rootThunkAction => async dispatch => {
  dispatch(updateLoadingStart(uiLoadingClasses.profile));
  let response = await profileApi.performLogin(email, password);
  if (response?.data?.id && response.data.token) {
    window.localStorage.setItem('exspender_user_token', response.data.token);
    response = await profileApi.fetchMe(response.data.token);
    if (response?.data?.id) {
      dispatch(updateUser(response.data));
      dispatch(updateLoadingSuccess(uiLoadingClasses.profile));
      return;
    }
  }
  if (response?.errors && response?.errors?.length > 0) {
    let errors = response?.errors;
    if (errors && errors[0]) {
      let errorMsg: messageType = {
        id: uuidv4(),
        type: messageTypes.error,
        class: messageClass.single,
        prefix: 'Login Error: ',
        messages: [errors[0]]
      };
      dispatch(addMessage(errorMsg));
      setTimeout(() => {
        dispatch(markMessageRemoval(errorMsg.id));
      }, 5000);
      setTimeout(() => {
        dispatch(removeMessage(errorMsg.id));
      }, 6000);
    }
  }
  dispatch(updateLoadingFailure(uiLoadingClasses.profile));
}

const Login: React.FC<{}> = function (props) {
  const dispatch = useDispatch();
  const authed = useSelector(getUserToken);
  const profileLoadState = useSelector(profileUI);
  const existingToken = window.localStorage.getItem('exspender_user_token');
  const [reloginTries, setReloginTries] = useState(0);

  useEffect(() => {
    if (reloginTries < 3 &&
      existingToken && existingToken !== 'null' && existingToken !== 'undefined' &&
      !authed && profileLoadState !== apiActionTypes.request) {
      // console.log('Re-Logging in with Token: ' + existingToken);
      dispatch(userRelogin(existingToken));
    }
  }, []);

  let userRelogin = (token: string): rootThunkAction => async dispatch => {
    setReloginTries(reloginTries + 1);
    dispatch(updateLoadingStart(uiLoadingClasses.profile));
    let response = await profileApi.fetchMe(token);
    if (response?.data?.id) {
      dispatch(updateUser(response.data));
      dispatch(updateLoadingSuccess(uiLoadingClasses.profile));
      return;
    }
    if (response?.errors && response?.errors?.length > 0) {
      let errors = response?.errors;
      console.log(errors);
    }
    dispatch(updateLoadingFailure(uiLoadingClasses.profile));
  }

  let handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data = new FormData(e.target as HTMLFormElement);
    let email = data.get('email')?.toString();
    let password = data.get('password')?.toString();
    if (email && password) {
      dispatch(submitLoginForm(email, password));
    }
  }

  if (authed) return <Navigate to={'/'} replace />;
  if (profileLoadState === apiActionTypes.request) return <Loading />;

  return <div className="container-fluid h-100 d-flex ai-center jc-center">
    <div className="row jc-center" style={{ transform: 'translate(0, -1.5rem)' }}>
      <h1 className="text-center mt-4 mb-3">ExSpender</h1>
      <form onSubmit={handleSubmit} id="login-form" className="col-4 col-md-6 col-sm-8 col-xs-10 d-flex flex-col">
        <input type="text" name="email" placeholder="Email" required />
        <input type="password" name="password" id="user-password" placeholder="Password" required />
        <div className="text-center"><button className="btn">Login</button></div>
        <p className="text-center mt-3">New to ExSpender? <Link to='/register'>Create New Account</Link></p>
      </form>
    </div>
  </div>;
}

export default Login;
export { submitLoginForm };