import {
  Input,
  Textarea,
  Checkbox,
  Typography,
  Button,
  Dialog,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../../Assets/poster.jpg";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Col, Row } from "antd";
import OTPInput from "../OTPInput";

interface RegisterInterface {}

const Register: React.FC<RegisterInterface> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [time, settime] = useState(30);
  const [validEmail, setValidEmail] = useState(false);
  const [validMobile, setValidMobile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [allSalesUserData, setAllUserData] = useState([]);
  const [selectUser, setSelectUser] = useState("");
  const handleOpen = () => setOpen(!open);

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
    if (regex.test(mobile)) {
      setValidMobile(false);
    } else {
      setValidMobile(true);
    }
  };

  return (
    <div className="w-full h-screen lg:flex items-center justify-between">
      <div className="h-screen lg:w-[60rem] lg:p-10 bg-primary/10 shadow-md rounded-lg">
        <h2 className="text-center uppercase text-2xl font-roboto_bold text-primary mb-10 underline">
          sign up
        </h2>
        <text className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
          basic details
        </text>
        {/* basic */}
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Input
              label="Name"
              color="brown"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <div>
              <Input
                label="Email"
                color="brown"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={emailValidation}
              />

              {validEmail && (
                <p className="text-red-600 text-xs  font-roboto_medium ">
                  Email is not valid.
                </p>
              )}
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Input
                label="Phone Number"
                color="brown"
                onChange={(e) => setMobile(e.target.value)}
                onBlur={mobileValidation}
              />
              {validMobile && (
                <p className="text-red-600 text-xs  font-roboto_medium">
                  Mobile number is not valid.
                </p>
              )}
            </div>
          </Col>
          {/* Sales User */}
          <Col span={12}>
            <Select
              label="Select Sales"
              color="brown"
              onChange={(e: any) => setSelectUser(e)}
              value={selectUser}
            >
              {allSalesUserData?.map((d: any) => {
                return <Option value={d.id}>{d.name}</Option>;
              })}
            </Select>
          </Col>
          {/* gst */}
          <text className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            GST Number with Address
          </text>
          <div className="w-72 lg:w-full mt-3 ">
            <Input
              label="GST Number"
              color="brown"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
            />
          </div>
          {/* address */}

          <Col span={12}>
            <Textarea
              label="Address"
              className="min-h-full"
              color="brown"
              rows={1}
              resize={true}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              label="City"
              color="brown"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Col>

          <Col span={12}>
            <Input
              label="State"
              color="brown"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Pin-Code"
              maxLength={6}
              color="brown"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Col>
        </Row>

        {/* password */}
        <div className="my-3">
          <text className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Password
          </text>
          <div className="w-72 lg:w-full mt-3 ml-5 lg:ml-0">
            <Input
              label="password"
              color="brown"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* footer */}
        <div className="flex items-center mt-6 lg:-ml-3 ml-3">
          <Checkbox color="amber" />
          <div className="w-[50rem]">
            <text className="font-roboto_regular text-blue-gray-500">
              By signing up, you are creating a Flowbite account, and you agree
              to Flowbite’s{" "}
            </text>
            <Link to="/" className="underline text-blue font-roboto_regular">
              Terms and Conditions
            </Link>
            <text className="font-roboto_regular text-blue-gray-500">
              {" "}
              and{" "}
            </text>
            <Link to="/" className="underline text-blue font-roboto_regular">
              Privacy Policy.
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center my-5">
          <Button
            onClick={() => {
              if (
                name &&
                email &&
                mobile &&
                gst &&
                address &&
                city &&
                state &&
                pincode &&
                password
              ) {
                // register();
              } else {
                toast.error("All Fields are required!");
              }
            }}
            variant="gradient"
            className="bg-primary w-64 text-sm"
          >
            sign up
          </Button>
        </div>
        <div className="flex items-center justify-center pb-5">
          <text className="mr-2">Already have an account?</text>
          <Link to="/login" className="underline text-blue font-roboto_regular">
            Login here
          </Link>
        </div>
      </div>
      <article
        className="object-cover h-screen w-[60rem] bg-no-repeat bg-center bg-cover lg:block hidden"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="min-w-screen min-h-screen bg-black/50 -mt-10 lg:-mt-0 px-10 flex flex-col justify-center">
          <text className="text-white text-3xl font-roboto_black">
            Jevar-Bazzar
          </text>
          <text className="text-white text-5xl font-roboto_regular mt-5 tracking-wide leading-tight">
            Explore the world’s leading design portfolios.
          </text>
          <text className="text-white font-roboto_regular mt-5 tracking-wide leading-tight">
            Millions of designers and agencies around the world showcase their
            portfolio work on Flowbite - the home to the world’s best design and
            creative professionals.
          </text>
        </div>
      </article>
      {/* otp modal */}
      <Dialog size="xs" open={open} handler={handleOpen} className="p-4">
        <text className="text-xl font-roboto_black tracking-wide text-primary block text-center">
          OTP Verification
        </text>
        <div className="border-b-[2px] rounded-2xl w-40 border-b-primary mt-1 m-auto" />
        <div className="my-5 mx-5">
          <p className="text-[0.95rem] text-black text-center">
            We have sent you{" "}
            <b className="tetx-black capitalize"> one time password </b> to your
            mobile number
          </p>
          <p className="text-center mt-2 text-sm font-roboto_medium text-red-600">
            Please Enter OTP
          </p>
          <p className="text-center mt-1 text-primary font-roboto_bold">
            00 : {time.toString().length === 1 ? "0" + time : time}
          </p>
          <div className="flex flex-col items-center justify-center my-5">
            <OTPInput
              length={4}
              className="otpContainer"
              inputClassName="otpInput"
              isNumberInput
              autoFocus
              onChangeOTP={(otp: any) => setOtp(otp)}
              inputStyle={{
                width: 40,
                height: 40,
                borderWidth: 2,
                borderColor: "lightgray",
                marginRight: 15,
                textAlign: "center",
                borderRadius: 6,
              }}
            />
          </div>
          {time == 0 && (
            <p
              // onClick={() => resendTime()}
              className="text-center capitalize text-red-500 font-roboto_medium cursor-pointer"
            >
              resend OTP
            </p>
          )}
          <div className="flex flex-col items-center justify-center pt-10">
            <Button
              onClick={() => {
                if (otp.length == 4) {
                  // verify();
                } else {
                  toast.error("Please fill OTP!");
                }
              }}
              variant="gradient"
              className={`${
                otp.length == 4 ? "bg-primary" : "bg-primary/75"
              } w-64 capitalize`}
            >
              verify OTP
            </Button>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Register;
