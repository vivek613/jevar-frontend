import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import mainAuth from "./mainAuth";
import salesAuth from "./salesAuth";
import adminAuth from "./admin";

import loader from "./loader";

export default combineReducers({
  auth,
  mainAuth,
  salesAuth,
  menu,
  loader,
  adminAuth,
});
