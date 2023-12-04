import { MENU_ACTION } from "../constants/index";

export const setShoeMenu = (data: any) => {
  return {
    type: MENU_ACTION,
    payload: data,
  };
};
