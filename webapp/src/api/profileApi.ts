import axios, { AxiosError } from "axios";
import { userApiResponseType, userProfileRegisterType, userProfileTypeOptional, userProfileUpdateType } from "../utilities/types";
import { apiUrl } from "./url";

async function registerUser(payload: userProfileRegisterType): Promise<userApiResponseType> {
  let returnData: userApiResponseType;
  let registerPayload: userProfileRegisterType = {
    firstname: payload.firstname,
    lastname: payload.lastname,
    username: payload.username,
    email: payload.email,
    password: payload.password,
  };

  try {
    let response = await axios.post(apiUrl.user.signup(), registerPayload);
    if (response.data?._id) {
      const { email, _id, firstname, lastname, username } = response.data;
      returnData = {
        code: response.status,
        data: {
          id: _id,
          email,
          firstname: firstname,
          lastname: lastname,
          username
        },
      }
    } else {
      returnData = {
        code: 400,
        errors: ['An Unexpected Error Occured']
      };
    }
  } catch (error) {
    returnData = { code: 400 };
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      returnData = {
        code: axiosError.response?.status || 400,
        errors: axiosError.response?.data.error.errors.map((e: any) => e.msg)
      };
    }
  }
  return returnData;
}

async function performLogin(email: string, password: string) {
  let payload = { email, password };
  try {
    let response = await axios.post(apiUrl.user.login(), payload);
    if (response.status === 200 && response.data.login === true) {
      let retPayload: userApiResponseType = {
        code: response.status,
        data: {
          id: response.data.id,
          email: response.data.email,
          token: response.data.token,
        }
      };
      return retPayload;
    } else if (response.data.error) {
      let retError: userApiResponseType = {
        code: response.status,
        errors: [response.data.error.message]
      }
      return retError;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      let retError: userApiResponseType = {
        code: axiosError.response?.status || 400,
        errors: [axiosError.response?.data.message]
      }
      return retError;
    }
  }
}

async function fetchMe(token: string) {
  try {
    let response = await axios.get(apiUrl.user.me(), { headers: { Authorization: 'Bearer ' + token } });
    if (response.data?._id) {
      const { email, _id, firstname, lastname, username } = response.data;
      let apiResponse: userApiResponseType = {
        code: response.status,
        data: { id: _id, email, firstname, lastname, username, token },
      }
      return apiResponse;
    } else if (response.status === 401) {
      let retError: userApiResponseType = { code: response.status, errors: ['Unauthorized'] };
      return retError;
    } else if (response.data.error) {
      let retError: userApiResponseType = { code: response.status, errors: [response.data.error.message] };
      return retError;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const axiosError = error as AxiosError;
      let retError: userApiResponseType = { code: 500, errors: ['Could not fetch User Data'] };
      return retError;
    }
  }
}

async function updateUser(payload: userProfileUpdateType, token: string) {
  let requestPayload: userProfileTypeOptional = {
    firstname: payload.firstname,
    lastname: payload.lastname,
  };
  let returnData: userApiResponseType;
  try {
    let response = await axios.put(
      apiUrl.user.byId(payload.id),
      requestPayload,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    if (response.data?._id) {
      const { _id, firstname, lastname } = response.data;
      returnData = { code: response.status, data: { id: _id, firstname, lastname } }
    } else {
      returnData = { code: 400, errors: ['An Unexpected Error Occured'] };
    }
  } catch (error) {
    returnData = { code: 400 };
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // console.log(axiosError.response?.data);
      if (axiosError.response) {
        if (axiosError.response?.data.error) {
          returnData = {
            code: axiosError.response?.status || 400,
            errors: axiosError.response?.data.error.errors.map((e: any) => e.msg)
          };
        } else {
          returnData = {
            code: axiosError.response?.status || 400,
            errors: [axiosError.response?.data.toString()]
          };
        }
      } else {
        returnData = { code: 400, errors: [] };
      }
    }
  }
  return returnData;
}

let profileApi = {
  registerUser,
  performLogin,
  fetchMe,
  updateUser,
};
export default profileApi;