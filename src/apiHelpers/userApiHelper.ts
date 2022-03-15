import axios from 'axios';
import { optionalProfileType, profilePayloadType, userApiResponseType, yBudgetApiResponseType, yearlyBudgetType } from '../app/constants/Types';
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
                firstname: firstname,
                lastname: lastname,
                username,
                authToken: token,
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

async function performRegister(payload: profilePayloadType) {
    try {
        let response = await axios.post(apiUrl.user.signup(), payload);
        if (response.data?._id) {
            const { email, _id, firstname, lastname, username } = response.data;
            let returnPayload: optionalProfileType = {
                userId: _id,
                email,
                firstname: firstname,
                lastname: lastname,
                username
            };
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

async function addYearBudget(payload: yearlyBudgetType, userId: string, token: string) {
    try {
        let requestPayload = {
            budget: payload.amount,
            year: payload.year,
            userId
        }
        let response = await axios.post(apiUrl.yearBudget.create(), requestPayload,
            { headers: { Authorization: 'Bearer ' + token } });
        if (response.data?.userId) {
            let returnPayload: yearlyBudgetType = {
                amount: response.data.budget,
                year: response.data.year,
                id: response.data._id,
            }
            let apiResponse: yBudgetApiResponseType = {
                code: response.status,
                data: [returnPayload],
            }
            return apiResponse;
        } else if (response.data.error) {
            let apiError: yBudgetApiResponseType = {
                code: response.status,
                error: [response.data.error.message]
            }
            return apiError;
        }
    } catch (error) {
        throw error;
    }
}

async function getAllYearBudgets(userId: string, token: string) {
    try {
        let response = await axios.get(apiUrl.yearBudget.readList(), { headers: { Authorization: 'Bearer ' + token } });
        if (response.data) {
            let apiResponse: yBudgetApiResponseType = {
                code: response.status,
                data: response.data.map((b: any) => ({
                    amount: b.budget,
                    year: b.year,
                    id: b._id,
                })),
            }
            return apiResponse;
        } else if (response.data.error) {
            let apiError: yBudgetApiResponseType = {
                code: response.status,
                error: [response.data.error.message]
            }
            return apiError;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateYearBudget(payload: yearlyBudgetType, userId: string, token: string) {
    try {
        let requestPayload = {
            budget: payload.amount,
            year: payload.year,
            userId
        }
        let response = await axios.put(apiUrl.yearBudget.update(payload.id), requestPayload,
            { headers: { Authorization: 'Bearer ' + token } });
        if (response.data?.userId) {
            let returnPayload: yearlyBudgetType = {
                amount: response.data.budget,
                year: response.data.year,
                id: response.data._id,
            }
            let apiResponse: yBudgetApiResponseType = {
                code: response.status,
                data: [returnPayload],
            }
            return apiResponse;
        } else if (response.data.error) {
            let apiError: yBudgetApiResponseType = {
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
    performRegister,
    performLogin,
    performLogout,
    fetchMe,
    yearBudget: {
        addBudget: addYearBudget,
        getAll: getAllYearBudgets,
        updateBudget: updateYearBudget,
    }
}

export default userApiHelper;