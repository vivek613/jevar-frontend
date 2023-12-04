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
import { useDispatch } from "react-redux";
import { login } from "../../../Stores/actions/auth";
import { API } from "../../../Service";

interface LoginInterface {
  handleOpen: () => void;
  rHandleOpen: () => void;
  open: boolean;
}

const Login: React.FC<LoginInterface> = ({ handleOpen, rHandleOpen, open }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [password, setpassword] = useState("");

  const loginUser = async () => {
    const regx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const body = {
      email: regx.test(value) ? value : "",
      mobile: regx.test(value) ? "" : value,
      password: password,
    };
    await API.normalUser_Login(body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          dispatch(login(response?.data.data));
          toast.success(response?.data.message);
        } else {
          toast.error("user not found!");
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

  const loginFilter = () => {
    if (value && password) {
      loginUser();
    } else {
      toast.error("All Fields are required!");
    }
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
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email or Mobile Number"
              size="lg"
              color="gray"
              required
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Input
              label="Password"
              size="lg"
              color="gray"
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" color="amber" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={loginFilter}
              fullWidth
              className="bg-secondry"
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
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
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
};

export default Login;
