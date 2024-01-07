import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../../../Stores/actions/mainAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddClient from "../../../Component/addClient";

interface DashboardHeaderInterface {}

const DashboardHeader: React.FC<DashboardHeaderInterface> = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal((cur) => !cur);

  const SideDrawer = () => {
    return (
      <Drawer open={open} onClose={closeDrawer}>
        <div className="flex flex-col justify-end items-end p-5">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-8 w-8" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/"
            onClick={closeDrawer}
            className={`my-8 p-5 rounded-full ${
              location.pathname == "/" ? "bg-primary/30" : ""
            }`}
          >
            <span className="text-lg font-roboto_bold uppercase tracking-wider">
              home
            </span>
          </Link>
          <Link
            to="/customer-list"
            onClick={closeDrawer}
            className={`mb-8 p-5 rounded-full ${
              location.pathname == "/customer-list" ? "bg-primary/30" : ""
            }`}
          >
            <span className="text-lg font-roboto_bold uppercase tracking-wider">
              customer list
            </span>
          </Link>
          <Link
            to="/add-collection"
            onClick={closeDrawer}
            className={`mb-8 p-5 rounded-full ${
              location.pathname == "/add-collection" ? "bg-primary/30" : ""
            }`}
          >
            <span className="text-lg font-roboto_bold uppercase tracking-wider">
              your collection
            </span>
          </Link>
        </div>
      </Drawer>
    );
  };

  const _logout = () => {
    dispatch(logout({}));
    navigation("/");
  };

  return (
    <>
      <div className="w-full h-14 bg-primary drop-shadow-xl flex items-center justify-between px-5 sticky top-0 z-50">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-white"
            onClick={openDrawer}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <text className="ml-4 text-lg text-white font-roboto_bold tracking-wider">
            Jevar-Bazzar
          </text>
        </div>
        <div className="flex items-center">
          <Button
            color="amber"
            className="md:mr-5 font-roboto_bold text-primary px-3 md:px-5"
            onClick={handleOpen}
          >
            add client
          </Button>
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
      <SideDrawer />
      <AddClient open={openModal} handleOpen={() => handleOpen()} />
    </>
  );
};

export default DashboardHeader;
