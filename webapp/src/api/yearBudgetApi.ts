import axios, { AxiosError } from "axios";
import { yBApiResponseType, yearBudgetCreateType, yearBudgetType } from "../utilities/types";
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

async function getAllYearBudgets(token: string) {
  let returnData: yBApiResponseType;

  try {
    let response = await axios.get(apiUrl.yearBudget.readList(),
      { headers: { Authorization: 'Bearer ' + token } });
    if (response.status === 200) {
      returnData = {
        code: 200,
        listData: response.data.map((budget: any) => {
          return {
            id: budget._id,
            userId: budget.userId,
            year: budget.year,
            budget: budget.budget,
          } as yearBudgetType;
        }),
      };

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
  getAllYearBudgets,
};

export default yearBudgetApi;