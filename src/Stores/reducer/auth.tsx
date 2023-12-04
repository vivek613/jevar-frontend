import { NORMAL_USER_LOGIN, NORMAL_USER_LOGOUT } from "../constants/index";

const initialState = { isLoggedIn: false, user: {} };

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case NORMAL_USER_LOGIN:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case NORMAL_USER_LOGOUT:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
