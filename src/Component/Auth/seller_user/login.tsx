import {
  Input,
  Textarea,
  Checkbox,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../../Assets/poster.jpg";
import { useDispatch } from "react-redux";
import { login } from "../../../Stores/actions/mainAuth";
import { API } from "../../../Service";
import { ToastContainer, toast } from "react-toastify";
import LoginComponents from "../../Login/Login";

interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
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
    await API.mainUser_Login(body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          dispatch(login(response.data.data));
          toast.success(response?.data.message);
          navigation("/");
        } else {
          toast.error("user not found!");
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

  return <LoginComponents login={_login} />;
};

export default Login;
