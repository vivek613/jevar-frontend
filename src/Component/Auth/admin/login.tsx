import { Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../../Assets/poster.jpg";
import { useDispatch } from "react-redux";

import { API } from "../../../Service";
import { ToastContainer, toast } from "react-toastify";
import { adminlogin } from "../../../Stores/actions/adminAuth";
import LoginComponents from "../../Login/Login";

interface LoginInterface {}

const AdminLogin: React.FC<LoginInterface> = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const _login = async (value: string, password: string) => {
    const regx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const body = {
      mobile: regx.test(value) ? "" : value,
      password: password,
    };
    await API.adminUser_Login(body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          console.log("ddddd", response.data.data);
          dispatch(adminlogin(response.data.data));
          toast.success(response?.data.message);
          navigation("/");
        } else {
          console.log("dddd", response);
          toast.info(response?.data.message);
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

  return <LoginComponents login={_login} register={"/"} />;
};

export default AdminLogin;
