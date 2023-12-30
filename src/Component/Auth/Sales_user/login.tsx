import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { API } from "../../../Service";
import { toast } from "react-toastify";
import { loginSales } from "../../../Stores/actions/salesAuth";
import LoginComponents from "../../Login/Login";

interface LoginInterface {}

const SalesLogin: React.FC<LoginInterface> = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const _login = async (value: string, password: string) => {
    const regx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const body = {
      email: regx.test(value) ? value : "",
      mobile: regx.test(value) ? "" : value,
      password: password,
    };
    await API.salesUser_Login(body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          console.log("ddddd", response.data.data);
          dispatch(loginSales(response.data.data));
          toast.success(response?.data.message);
          navigation("/");
        } else {
          toast.error(response?.data.message || "User Not Found");
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

  return <LoginComponents login={_login} />;
};

export default SalesLogin;
