import { combineReducers } from "redux";
import { showPasswordClick } from "./use-redux";

const root = combineReducers({
  showPassword: showPasswordClick,
//   currency: currencyUSD,
});

export default root;
