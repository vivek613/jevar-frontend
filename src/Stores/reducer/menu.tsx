import { MENU_ACTION } from "../constants/index";

const initialState = { isShow: false };

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case MENU_ACTION:
      return {
        isShow: payload,
      };
    default:
      return state;
  }
}
