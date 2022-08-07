import axios, { AxiosError } from "axios";
import { yBApiResponseType, yearBudgetCreateType } from "../utilities/types";
import { apiUrl } from "./url";

async function yearBudgetCreate(payload: yearBudgetCreateType, token: string) {
  let returnData: yBApiResponseType;
  try {
    let response = await axios.post(
      apiUrl.yearBudget.create(),
      payload,
      { headers: { Authorization: 'Bearer ' + token } }
    );

    if (response.data?._id) {
      console.log(response.data);
      returnData = {
        code: response.status,
        data: {
          id: response.data._id,
          year: response.data.year,
          budget: response.data.budget,
          userId: response.data.userId,
        }
      }
    } else {
      returnData = { code: 400, errors: ['An Unexpected Error Occured'] };
    }
  } catch (error) {
    returnData = { code: 400 };
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError.response?.data);
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

let yearBudgetApi = {
  yearBudgetCreate,
};

export default yearBudgetApi;