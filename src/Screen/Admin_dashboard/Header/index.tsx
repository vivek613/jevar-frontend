import React, { useEffect, useState } from "react";

import { FiLogOut } from "react-icons/fi";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { adminlogout } from "../../../Stores/actions/adminAuth";

interface DashboardHeaderInterface {}

const DashboardHeader: React.FC<DashboardHeaderInterface> = () => {
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const _logout = () => {
    dispatch(adminlogout({}));
    navigation("/");
  };

  return (
    <>
      <div className="w-full h-14 bg-primary drop-shadow-xl flex items-center justify-between px-5 sticky top-0 z-50">
        <div className="flex items-center">
          <text className="ml-4 text-lg text-white font-roboto_bold tracking-wider">
            Jevar-Bazzar Sales
          </text>
        </div>
        <div className="flex items-center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-7 h-7 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg> */}
          <button onClick={_logout} className="bg-transparent shadow-none ml-3">
            <FiLogOut className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
