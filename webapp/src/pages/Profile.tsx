import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import profileApi from "../api/profileApi";
import { addMessage, markMessageRemoval, removeMessage } from "../app/reducers/messageReducer";
import { updateLoadingFailure, updateLoadingStart, updateLoadingSuccess } from "../app/reducers/uiLoadingReducer";
import { profileInitialState, updateUser } from "../app/reducers/userProfileReducer";
import { getProfile } from "../app/store";
import Navbar from "../components/Navbar";
import { getSuccessMessage, mapNetworkErrorsToUIErrors } from "../utilities/errorHandlingUtilities";
import { messageClass, messageType, messageTypes, rootThunkAction, uiLoadingClasses, userProfileTypeOptional, userProfileUpdateType } from "../utilities/types";

let Profile: React.FC<{}> = function Profile(props) {
  const dispatch = useDispatch();
  let profile = useSelector(getProfile);
  let [firstname, setFirstname] = useState(profile.firstname);
  let [lastname, setLastname] = useState(profile.lastname);
  let [editMode, setEditMode] = useState(false);

  function cancelEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setFirstname(profile.firstname);
    setLastname(profile.lastname);
    setEditMode(false);
  }
  function handleEditSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    let payload: userProfileUpdateType = {
      id: profile.id,
      firstname: firstname,
      lastname: lastname,
    }
    dispatch(submitEditForm(payload));
  }
  function logout() {
    dispatch(updateUser(profileInitialState));
    window.localStorage.setItem('exspender_user_token', '');
  }
  function handleFirstnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstname(e.target.value);
  }
  function handleLastnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastname(e.target.value);
  }

  function submitEditForm(payload: userProfileUpdateType): rootThunkAction {
    return async dispatch => {
      dispatch(updateLoadingStart(uiLoadingClasses.profile));
      let res = await profileApi.updateUser(payload, profile.token);
      let userData = res?.data;
      if (userData && userData.id) {
        dispatch(updateUser(userData));
        dispatch(updateLoadingSuccess(uiLoadingClasses.profile));
        let successMsg = getSuccessMessage('Successfully Updated!');
        dispatch(addMessage(successMsg));
        setEditMode(false);
        setTimeout(() => {
          dispatch(markMessageRemoval(successMsg.id));
        }, 3000);
        setTimeout(() => {
          dispatch(removeMessage(successMsg.id));
        }, 3100);
        return;
      }

      let errors = res?.errors;
      if (errors) {
        let errorMsg: messageType = mapNetworkErrorsToUIErrors(
          messageTypes.error,
          errors,
          {
            msgClass: messageClass.multiline,
            prefix: 'Updation Error - ',
            defaultMessage: 'Could not update Profile',
          }
        );
        dispatch(addMessage(errorMsg));
        setTimeout(() => {
          dispatch(markMessageRemoval(errorMsg.id));
        }, 6000);
        setTimeout(() => {
          dispatch(removeMessage(errorMsg.id));
        }, 6100);
      }
      dispatch(updateLoadingFailure(uiLoadingClasses.profile));
    }
  }

  return <section id='profile'>
    <Navbar />
    <form onSubmit={() => { }} className="container mt-5">
      <div className="row jc-center">
        <p className="fc-primary-light text-center col-12">Account Information</p>
        <div className="col-4 col-md-12">
          <input value={profile.email} className="w-100 border-r2" type="email" name="email" id="email" placeholder="Email" disabled required />
        </div>
        <div className="col-4 col-md-12">
          <input value={profile.id} className="w-100 border-r2" type="text" name="id" id="id" placeholder="User ID" disabled required />
        </div>
      </div>

      <div className="container mt-4">
        <div className="row jc-center">
          <p className="col-12 fc-primary-light text-center">Personal Information</p>
          <div className="col-3">
            <input value={firstname} onChange={handleFirstnameChange} className="w-100 border-r2"
              type="text" name="firstname" id="firstname" placeholder="First Name" disabled={!editMode} required />
          </div>
          <div className="col-3">
            <input value={lastname} onChange={handleLastnameChange} className="w-100 border-r2"
              type="text" name="lastname" id="lastname" placeholder="Last Name" disabled={!editMode} required />
          </div>
          <div className="col-3">
            <input value={profile.username} className="w-100 border-r2" type="text" name="username" id="username" placeholder="Username" disabled required />
          </div>
        </div>
      </div>


      {editMode
        ? <div className="text-center">
          <button className="btn" onClick={handleEditSubmit}>Submit</button>
          <button className="btn" onClick={cancelEdit}>Cancel</button>
        </div>
        : <div className="text-center"><button className="btn" onClick={e => { e.preventDefault(); setEditMode(true); }}>Edit</button></div>}
    </form>
    <div className="text-center">
      <button className="btn" onClick={e => logout()}>Logout</button>
    </div>

  </section>
}

export default Profile;
