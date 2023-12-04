import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import mainAuth from "./mainAuth";
import loader from "./loader";

export default combineReducers({
  auth,
  mainAuth,
  menu,
  loader,
});
