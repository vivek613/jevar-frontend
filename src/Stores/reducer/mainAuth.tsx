import { MAIN_USER_LOGIN, MAIN_USER_LOGOUT } from "../constants/index";

const initialState = { isLoggedIn: false, user: {} };

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case MAIN_USER_LOGIN:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case MAIN_USER_LOGOUT:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: false,
      };
     
    default:
      return state;
  }
}
