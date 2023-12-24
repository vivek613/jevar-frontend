import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../Assets/poster.jpg";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";

interface LoginInterface {}

const LoginComponents: React.FC<LoginInterface> = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-between">
      <div className="h-screen lg:w-[60rem] w-full lg:p-14 bg-primary/10 shadow-md rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-center uppercase text-2xl font-roboto_bold text-primary mb-10 underline">
          sign in
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-80">
            <Input
              label="Email / Phone Number"
              color="brown"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="w-80 mt-5">
            <Input
              label="Password"
              color="brown"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        </div>

        {/* footer */}
        {/* <div className="flex items-center mt-6">
            <Checkbox color="amber" />
            <text>Remember Me</text>
          </div> */}
        <text className="relative mt-4 cursor-pointer text-red-600 font-roboto_regular">
          forgot Password?
        </text>
        <div className="flex items-center justify-center mt-7 mb-5">
          <Button
            onClick={() => {
              if (value && password) {
                // _login();
              } else {
                toast.error("All Fields are required!");
              }
            }}
            className="bg-primary w-80 text-sm"
          >
            sign in
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <text className="mr-2">You have no account?</text>
          <Link
            to="/register"
            className="underline text-blue font-roboto_regular"
          >
            Register here
          </Link>
        </div>
      </div>
      <article
        className="object-cover h-screen w-[60rem] bg-no-repeat bg-center bg-cover lg:block hidden"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="min-w-screen min-h-screen bg-black/50 -mt-10 lg:-mt-0 px-10 flex flex-col justify-center">
          <text className="text-white text-3xl font-roboto_black">
            Jever-Bazzar
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
      <ToastContainer />
    </div>
  );
};

export default LoginComponents;
