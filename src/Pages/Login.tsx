import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiActionTypes, rootThunkAction } from '../app/constants/Types';
import { setUserUpdateFailure, setUserUpdateStart, setUserUpdateSuccess, updateUser } from '../app/reducers/profileReducer';
import { getLoginStatus, getUserUpdateStatus } from '../app/store';
import { Redirect } from 'react-router';
import userApiHelper from '../apiHelpers/userApiHelper';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

let Login: React.FC<{}> = function (props) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getLoginStatus);
    let userUpdateStatus = useSelector(getUserUpdateStatus);
    let submitLoginForm = (email: string, password: string): rootThunkAction => async dispatch => {
        dispatch(setUserUpdateStart());
        try {
            let res = await userApiHelper.performLogin(email, password);
            if (res?.error && res.error.length > 0) {
                dispatch(setUserUpdateFailure());
                return;
            }
            let userData = res?.data;
            if (userData && userData.authToken && userData.userId) {
                window.localStorage.setItem('exspender_user_token', userData.authToken);
                res = await userApiHelper.fetchMe(userData.authToken);
                if (res?.error && res.error.length > 0) return;
                userData = res?.data;
                if (!userData) {
                    window.localStorage.setItem('exspender_user_token', '');
                    dispatch(setUserUpdateFailure());
                    return;
                }
                dispatch(updateUser(userData));
            } else {
                dispatch(setUserUpdateFailure());
                return;
            }
            dispatch(setUserUpdateSuccess());
        } catch (error) {
            dispatch(setUserUpdateFailure());
        }
    }

    let getSelfDetails = (token: string): rootThunkAction => async dispatch => {
        dispatch(setUserUpdateStart());
        try {
            let res = await userApiHelper.fetchMe(token);
            if (res?.error && res.error.length > 0) return;
            let userData = res?.data;
            if (userData && userData.userId) {
                dispatch(updateUser(userData));
                dispatch(setUserUpdateSuccess());
            }
        } catch (error) {
            dispatch(setUserUpdateFailure());
        }
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

    if (isLoggedIn) {
        return <Redirect to={'/home'} />;
    }

    const existingToken = window.localStorage.getItem('exspender_user_token');
    if (existingToken && userUpdateStatus !== apiActionTypes.request) {
        dispatch(getSelfDetails(existingToken));
    }
    if (userUpdateStatus === apiActionTypes.request) {
        return <Loading />;
    }
    return <div className="container-fluid h-100 d-flex ai-center jc-center">
        <div className="row jc-center" style={{ transform: 'translate(0, -1.5rem)' }}>
            <h1 className="text-center mt-4 mb-3">ExSpender</h1>
            <form onSubmit={handleSubmit} id="login-form" className="col-4 col-md-6 col-sm-8 col-xs-10 d-flex flex-col">
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" id="user-password" placeholder="Password" required />
                <div className="text-center"><button className="btn">Login</button></div>
                <p className="text-center mt-3">New to ExSpender? <Link to='register'>Create New Account</Link></p>
            </form>
        </div>
    </div>;
}

export default Login;