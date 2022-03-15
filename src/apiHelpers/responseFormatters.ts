import { AxiosError } from "axios";
import { userApiResponseType } from "../app/constants/Types";

export let apiErrorFormatter = function (error: AxiosError) {
    console.log(error.response);
    if (error.response?.data) {
        let apiError: userApiResponseType = {
            code: error.response.status,
            error: error.response.data.error.errors
                ? [...error.response.data.error.errors]
                : [error.response.data.error]
        }
        return apiError;
    }
}