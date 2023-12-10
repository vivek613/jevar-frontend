import {  SALES_USER_LOGIN, SALES_USER_LOGOUT } from "../constants/index";



export const loginSales = (user: any) => {
  return {
    type: SALES_USER_LOGIN,
    payload: user,
  };
};

export const logoutSales = (user: any) => {
  return {
    type: SALES_USER_LOGOUT,
    payload: user,
  };
};