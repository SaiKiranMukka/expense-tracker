import * as RestService from './Helper/request';
import * as CONSTANTS from '../Constants';

export const getStatsData = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.DASHBOARD_API_ENDPOINT + 'currentMonthCategoryWiseStats');
  return data || [];
}

export const getDashboardData = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.DASHBOARD_API_ENDPOINT + 'lastNMonthsCategoryWisePlot/?numOfMonths=6');
  return data || [];
}

export const getLineData = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.DASHBOARD_API_ENDPOINT + 'lastNDaysCategoryWisePlot/?numOfDays=7');
  return data || [];
}

export const getPieData = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.DASHBOARD_API_ENDPOINT + 'lastNMonthsPaymentModeWisePlot/?numOfMonths=1');
  return data || [];
}

export const getCreditCardData = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.DASHBOARD_API_ENDPOINT + 'lastNMonthsCreditUtilization/?numOfMonths=6');
  return data || [];
}