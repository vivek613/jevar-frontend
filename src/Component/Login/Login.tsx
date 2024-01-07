import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../Assets/poster.jpg";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";

interface LoginInterface {
  login: (value: string, password: string) => void;
  register: string;
}

const LoginComponents: React.FC<LoginInterface> = ({ login, register }) => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <div className=" relative w-80 container mx-auto mt-4">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              color="brown"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
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
                login(value, password);
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
            to={`/${register}`}
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
      <ToastContainer />
    </div>
  );
};

export default LoginComponents;
