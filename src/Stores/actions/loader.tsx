import { LOADER } from "../constants";

export const setLoader = (data: any) => {
  return {
    type: LOADER,
    payload: data,
  };
};
