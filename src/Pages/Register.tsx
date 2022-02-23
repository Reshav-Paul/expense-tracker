import axios, { AxiosError } from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { apiErrorFormatter } from "../apiHelpers/responseFormatters";
import userApiHelper from "../apiHelpers/userApiHelper";
import { apiActionTypes, profilePayloadType, rootThunkAction } from "../app/constants/Types";
import { setUserUpdateFailure, setUserUpdateStart, setUserUpdateSuccess, updateUser } from "../app/reducers/profileReducer";

import { getLoginStatus, getUserUpdateStatus } from "../app/store";
import Loading from "../components/Loading";

const Register: React.FC<{}> = function (props) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getLoginStatus);
    let userUpdateStatus = useSelector(getUserUpdateStatus);

    let submitRegisterForm = (payload: profilePayloadType): rootThunkAction => async dispatch => {
        dispatch(setUserUpdateStart());
        let password = payload.password;
        try {
            let res = await userApiHelper.performRegister(payload);
            payload.password = undefined;
            if (res?.error && res.error.length > 0) {
                dispatch(setUserUpdateFailure());
                return;
            }
            let userData = res?.data;

            if (userData && userData.userId) {
                dispatch(updateUser(userData));
                if (userData.email && password) {
                    let loginRes = await userApiHelper.performLogin(userData.email, password);
                    if (loginRes?.error && loginRes.error.length > 0) {
                        dispatch(setUserUpdateFailure());
                        return;
                    }
                    userData = loginRes?.data;
                    if (userData && userData.authToken && userData.userId) {
                        window.localStorage.setItem('exspender_user_token', userData.authToken);
                        dispatch(updateUser(userData));
                    } else {
                        dispatch(setUserUpdateFailure());
                        return;
                    }
                }
            }
            dispatch(setUserUpdateSuccess());
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                let errorResponse = apiErrorFormatter(axiosError);
                console.log(errorResponse);
            }
            dispatch(setUserUpdateFailure());
        }
    }

    let handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data = new FormData(e.target as HTMLFormElement);
        let email = data.get('email')?.toString();
        let password = data.get('password')?.toString();
        let firstname = data.get('firstname')?.toString();
        let lastname = data.get('lastname')?.toString();
        let username = data.get('username')?.toString();
        if (email && password) {
            let payload: profilePayloadType = {
                firstname, lastname, username, email, password
            }
            dispatch(submitRegisterForm(payload));
        }
    }

    if (isLoggedIn) {
        return <Redirect to={'/home'} />;
    }

    if (userUpdateStatus === apiActionTypes.request) {
        return <Loading />;
    }

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