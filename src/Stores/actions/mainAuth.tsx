import { MAIN_USER_LOGIN, MAIN_USER_LOGOUT } from "../constants/index";

export const login = (user: any) => {
  return {
    type: MAIN_USER_LOGIN,
    payload: user,
  };
};

export const logout = (user: any) => {
  return {
    type: MAIN_USER_LOGOUT,
    payload: user,
  };
};
