import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import userApiHelper from '../apiHelpers/userApiHelper';
import { apiActionTypes, rootThunkAction } from '../app/constants/Types';
import { setUserUpdateFailure, setUserUpdateStart, setUserUpdateSuccess, updateUser, userInitialState } from '../app/reducers/profileReducer';
import { getLoginStatus, getUserUpdateStatus } from '../app/store';
import { Loading } from '../components/Loading';
import Titlebar from '../components/Titlebar';

let Profile: React.FC<{}> = function (props) {
    const isLoggedIn = useSelector(getLoginStatus);
    const dispatch = useDispatch();
    let userUpdateStatus = useSelector(getUserUpdateStatus);

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

    console.log(isLoggedIn);
    if (!isLoggedIn) return <Redirect to={'/login'} />;

    if (userUpdateStatus === apiActionTypes.request) return <Loading />;

    return <section id="profile" className="container-fluid">
        <Titlebar title={'Profile'} />
        <button className="btn" onClick={e => dispatch(logout())}>Logout</button>
    </section>;
}

export default Profile;