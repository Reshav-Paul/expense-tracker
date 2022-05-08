import React from "react";
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
import { apiActionTypes, messageClass, messageType, messageTypes, rootThunkAction, uiLoadingClasses, userProfileRegisterType } from "../utilities/types";
import { submitLoginForm } from "./Login";

const Register: React.FC<{}> = function (props) {
  const dispatch = useDispatch();
  const authed = useSelector(getUserToken);
  const profileLoadState = useSelector(profileUI);

  let handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data = new FormData(e.target as HTMLFormElement);
    let email = data.get('email')?.toString();
    let password = data.get('password')?.toString();
    let firstname = data.get('firstname')?.toString();
    let lastname = data.get('lastname')?.toString();
    let username = data.get('username')?.toString();
    if (email && password) {
      let payload: userProfileRegisterType = {
        firstname, lastname, username, email, password
      }
      dispatch(submitRegisterForm(payload));
    }
  }

  let submitRegisterForm = (payload: userProfileRegisterType): rootThunkAction =>
    async dispatch => {
      dispatch(updateLoadingStart(uiLoadingClasses.profile));
      let password = payload.password;
      let res = await profileApi.registerUser(payload);
      payload.password = undefined;
      let userData = res?.data;
      if (userData && userData.id) {
        dispatch(updateUser(userData));
        dispatch(updateLoadingSuccess(uiLoadingClasses.profile));
        if (userData.email && password) {
          dispatch(submitLoginForm(userData.email, password));
        }
        return;
      }

      let errors = res?.errors;
      if (errors) {
        let errorMsg: messageType;
        if (errors.length > 0) {
          errorMsg = {
            id: uuidv4(),
            type: messageTypes.error, class: messageClass.multiline,
            prefix: 'Registration Error ',
            messages: [...errors]
          };
        } else {
          errorMsg = {
            id: uuidv4(),
            type: messageTypes.error, class: messageClass.single,
            prefix: 'Registration Error: ',
            messages: ['Unable to Register User']
          };
        }
        dispatch(addMessage(errorMsg));
        setTimeout(() => {
          dispatch(markMessageRemoval(errorMsg.id));
        }, 20000);
        setTimeout(() => {
          dispatch(removeMessage(errorMsg.id));
        }, 21000);
      }
      dispatch(updateLoadingFailure(uiLoadingClasses.profile));
    }

  if (authed) return <Navigate to={'/'} replace />;
  if (profileLoadState === apiActionTypes.request) return <Loading />;

  return <div className="container-fluid h-100 d-flex ai-center jc-center">
    <div className="row jc-center" style={{ transform: 'translate(0, -1.5rem)' }}>
      <h1 className="text-center mt-4 mb-2">ExSpender</h1>
      <p className="text-center mb-3">Create New Account</p>
      <form id="register-form" onSubmit={handleSubmit} className="col-4 col-md-6 col-sm-8 col-xs-10 d-flex flex-col">
        <input type="text" name="firstname" id="firstname" placeholder="First Name" required />
        <input type="text" name="lastname" id="lastname" placeholder="Last Name" required />
        <input type="text" name="username" id="username" placeholder="Username" required />
        <input type="email" name="email" id="email" placeholder="Email" required />
        <input type="password" name="password" id="password" placeholder="Password" required />
        <div className="text-center"><button className="btn">Register</button></div>
        <p className="text-center mt-3">Already a User? <Link to='login'>Login</Link></p>
      </form>
    </div>
  </div>;
}

export default Register;