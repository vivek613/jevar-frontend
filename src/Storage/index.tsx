import { Storage } from "redux-persist";

const reduxStorage: Storage = {
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = localStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
