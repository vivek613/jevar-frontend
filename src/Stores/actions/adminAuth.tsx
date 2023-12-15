import { ADMIN_USER_LOGIN, ADMIN_USER_LOGOUT } from "../constants/index";

export const adminlogin = (user: any) => {
  return {
    type: ADMIN_USER_LOGIN,
    payload: user,
  };
};

export const adminlogout = (user: any) => {
  return {
    type: ADMIN_USER_LOGOUT,
    payload: user,
  };
};
