import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Stores/actions/auth";
import { API } from "../../../Service";
import { setLoader } from "../../../Stores/actions/loader";

interface RegisterInterface {
  handleOpen: () => void;
  rHandleOpen: () => void;
  open: boolean;
}

const Register: React.FC<RegisterInterface> = ({
  handleOpen,
  rHandleOpen,
  open,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [OTP, setOTP] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validMobile, setValidMobile] = useState(false);

  const emailValidation = () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const mobileValidation = () => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (regex.test(number)) {
      setValidMobile(false);
    } else {
      setValidMobile(true);
    }
  };

  const registerUser = async () => {
    const data = {
      email: email,
      mobile: number,
    };
    dispatch(setLoader(true));
    await API.normalUser_Register(data, dispatch)
      .then((response) => {
        setStatus(response?.data.status);
        toast.success(response?.data.message);
        dispatch(setLoader(false));
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  const confirm = async () => {
    dispatch(setLoader(true));
    const data = {
      name: name,
      email: email,
      mobile: number,
      password: password,
      otp: parseInt(OTP),
    };
    await API.confirmOTP(data, dispatch)
      .then((response) => {
        dispatch(setLoader(false));
        setTimeout(() => {
          dispatch(login(response?.data.data));
          toast.success(response?.data.message);
        }, 200);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        dispatch(setLoader(false));
      });
  };

  return (
    <React.Fragment>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white" className="font-roboto_bold">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              color="gray"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Email"
              size="lg"
              color="gray"
              value={email}
              required
              onBlur={emailValidation}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {validEmail && (
              <p className="text-red-600 text-xs -mt-2 font-roboto_medium">
                Email is not valid.
              </p>
            )}
            <Input
              label="Mobile Number"
              size="lg"
              color="gray"
              required
              onBlur={mobileValidation}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            {validMobile && (
              <p className="text-red-600 text-xs -mt-2 font-roboto_medium">
                Mobile number is not valid.
              </p>
            )}
            <Input
              label="Password"
              size="lg"
              color="gray"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {status === "success" && (
              <>
                <p className="text-left font-roboto_regular">Enter OTP</p>
                <Input
                  label="OTP"
                  size="lg"
                  color="gray"
                  value={OTP}
                  required
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                />
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                if (status === "success") {
                  if (OTP) {
                    confirm();
                  } else {
                    toast.error("OTP is required!");
                  }
                } else {
                  if (name && email && number && password) {
                    registerUser();
                  } else {
                    toast.error("All Fields are required!");
                  }
                }
              }}
              fullWidth
              className="bg-secondry"
            >
              Sign up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Do you have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={() => {
                  setTimeout(() => {
                    rHandleOpen();
                  }, 200);
                  handleOpen();
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
};

export default Register;
