import { LOADER } from "../constants/index";

const initialState = { isShow: false };

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case LOADER:
      return {
        ...state,
        isShow: payload,
      };
    default:
      return state;
  }
}
