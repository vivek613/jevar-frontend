import { NORMAL_USER_LOGIN, NORMAL_USER_LOGOUT } from "../constants/index";

export const login = (user: any) => {
  return {
    type: NORMAL_USER_LOGIN,
    payload: user,
  };
};

export const logout = (user: any) => {
  return {
    type: NORMAL_USER_LOGOUT,
    payload: user,
  };
};
