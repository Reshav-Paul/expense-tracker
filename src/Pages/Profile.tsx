import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import userApiHelper from '../apiHelpers/userApiHelper';
import { apiActionTypes, rootThunkAction } from '../app/constants/Types';
import { setUserUpdateFailure, setUserUpdateStart, setUserUpdateSuccess, updateUser, userInitialState } from '../app/reducers/profileReducer';
import { getLoginStatus, getUserUpdateStatus, getProfile } from '../app/store';
import Loading from '../components/Loading';
import Titlebar from '../components/Titlebar';

let Profile: React.FC<{}> = function (props) {
    const isLoggedIn = useSelector(getLoginStatus);
    const dispatch = useDispatch();
    let userUpdateStatus = useSelector(getUserUpdateStatus);
    let userProfile = useSelector(getProfile);

    let logout = (): rootThunkAction => async dispatch => {
        dispatch(setUserUpdateStart());
        try {
            await userApiHelper.performLogout();
            window.localStorage.setItem('exspender_user_token', '');
            dispatch(updateUser(userInitialState));
            dispatch(setUserUpdateSuccess());
        } catch (error) {
            dispatch(setUserUpdateFailure());
        }
    }

    if (!isLoggedIn) return <Redirect to={'/login'} />;

    if (userUpdateStatus === apiActionTypes.request) return <Loading />;

    return <section id="profile" className="container-fluid">
        <Titlebar title={'Profile'} />
        <div className="container">
            <div className="row jc-center mb-3">
                <div className="col-6 col-sm-12">
                    <p className="mb-2">Email</p>
                    <input className="border-r2 w-100" type="text" disabled value={userProfile.email} />
                </div>
            </div>
            <div className="row jc-center mb-3">
                <div className="col-3 col-sm-12">
                    <p className="mb-2">First Name</p>
                    <input className="border-r2 w-100" type="text" disabled value={userProfile.firstname} />
                </div>
                <div className="col-3 col-sm-12">
                    <p className="mb-2">Last Name</p>
                    <input className="border-r2 w-100" type="text" disabled value={userProfile.lastname} />
                </div>
            </div>
            <div className="row jc-center mb-3">
                <div className="col-3 col-sm-12">
                    <p className="mb-2">Username</p>
                    <input className="border-r2 w-100" type="text" disabled value={userProfile.username} />
                </div>
                <div className="col-3 col-sm-12">
                    <p className="mb-2">User ID</p>
                    <input className="border-r2 w-100" type="text" disabled value={userProfile.userId} />
                </div>
            </div>
            <div className="row jc-center">
                <div className="col-1">
                    <button className="btn" onClick={e => dispatch(logout())}>Logout</button>
                </div>
            </div>
        </div>
    </section>;
}

export default Profile;