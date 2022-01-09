import axios from 'axios';
import { optionalProfileType, userApiResponseType } from '../app/constants/Types';
import { apiUrl } from '../app/constants/utilityData';

async function performLogin(email: string, password: string) {
    let payload = { email, password };
    try {
        let response = await axios.post(apiUrl.user.login(), payload);
        if (response.status === 200 && response.data.login === true) {
            let returnPayload: optionalProfileType = {
                userId: response.data.id,
                email: response.data.email,
                authToken: response.data.token,
            }
            let apiResponse: userApiResponseType = {
                code: response.status,
                data: returnPayload,
            }
            return apiResponse;
        } else if (response.data.error) {
            let apiError: userApiResponseType = {
                code: response.status,
                error: [response.data.error.message]
            }
            return apiError;
        }
    } catch (error) {
        throw error;
    }
}

async function performLogout() {
    try {
        let response = await axios.post(apiUrl.user.logout());
        let apiResponse: userApiResponseType = {
            code: response.status,
        }
        return apiResponse;
    } catch (error) {
        throw error;
    }
}

async function fetchMe(token: string) {
    try {
        let response = await axios.get(apiUrl.user.me(), { headers: { Authorization: 'Bearer ' + token } });
        if (response.data?._id) {
            const { email, _id, firstname, lastname, username } = response.data;
            let returnPayload: optionalProfileType = {
                userId: _id,
                email,
                firstName: firstname,
                lastName: lastname,
                username
            };
            let apiResponse: userApiResponseType = {
                code: response.status,
                data: returnPayload,
            }
            return apiResponse;
        } else if (response.status === 401) {
            let apiError: userApiResponseType = {
                code: response.status,
                error: ['Unauthorized']
            }
            return apiError;
        } else if (response.data.error) {
            let apiError: userApiResponseType = {
                code: response.status,
                error: [response.data.error.message]
            }
            return apiError;
        }
    } catch (error) {
        throw error;
    }
}

let userApiHelper = {
    performLogin,
    performLogout,
    fetchMe,
}

export default userApiHelper;