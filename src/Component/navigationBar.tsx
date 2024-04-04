import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { HiShoppingBag } from "react-icons/hi";
import { MdPrivacyTip } from "react-icons/md";
import Login from "./Auth/normal_user/login";
import Register from "./Auth/normal_user/register";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Stores/actions/auth";
import { API, Image_URL } from "../Service";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    flag: "",
  },
  {
    label: "Sell Product",
    icon: UserCircleIcon,
    flag: "",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    flag: "logout",
  },
];

function ProfileMenu() {
  const userdata = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [profile, setprofile] = useState<any>(null);
  const [user, setuser] = useState<any>({});
  const closeMenu = () => setIsMenuOpen(false);

  const _isLogout = () => {
    dispatch(logout({}));
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await API.normalUser_profile(
      userdata?.user.user.id,
      userdata?.user.token,
      dispatch
    )
      .then((response) => {
        setuser(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {user.profile_image == undefined ? (
            <div className="w-10 h-10 flex items-center justify-center border-2 overflow-hidden rounded-full">
              <text className="text-xl font-roboto_black ">
                {userdata?.user.user.name.charAt(0)}
              </text>
            </div>
          ) : (
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5 bg-contain bg-center"
              src={`${user?.profile_image.data}`}
            />
          )}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, flag }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (key == 2) {
                  _isLogout();
                  closeMenu();
                } else if (key == 0) {
                  navigate("/user-profile");
                  closeMenu();
                } else if (key == 1) {
                  navigate("/sell-product");
                  closeMenu();
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <div
                onClick={() => {}}
                className="flex items-center justify-center"
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal ml-3"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "Used Jewellery Shop",
    description:
      "You can buy also already used jewellery and select your favorite designs.",
    route: "/used-jewellry",
  },
  {
    title: "Brand New Collection",
    description:
      "You can see brand new collection our most valuable partner's jewellers.",
    route: "/jewellry-collection",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description, route }) => (
    <Link to={route} key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Shop{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img
              src="https://imgmedia.lbb.in/media/2022/09/632846916e5fb64e9bd02f1a_1663583889764.jpg"
              alt=""
            />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "About US",
    icon: MdPrivacyTip,
    route: "/about",
  },
  {
    label: "Privacy Policy",
    icon: MdPrivacyTip,
    route: "/privacy-policy",
  },
  {
    label: "Career",
    icon: MdPrivacyTip,
    route: "/Career",
  },
  // {
  //   label: "Terms & Condition",
  //   icon: MdPrivacyTip,
  //   route: "/terms-condition",
  // },
  // {
  //   label: "Buy Service",
  //   icon: HiShoppingBag,
  //   route: "/service",
  // },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
       <Link to={"/offers"}>
          <Typography
            key={'Offers'}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(MdPrivacyTip, { className: "h-[18px] w-[18px]" })}{" "}
              {"Offers"}
            </MenuItem>
          </Typography>
        </Link>
      <NavListMenu />
      {navListItems.map(({ label, icon, route }, key) => (
        <Link to={route}>
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
}

const Authentication = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [rOpen, setROpen] = React.useState(false);
  const rHandleOpen = () => setROpen((cur) => !cur);
  return (
    <div className="absolute right-0 mr-12 lg:mr-0">
      <Button
        onClick={handleOpen}
        variant="text"
        className="capitalize text-md p-3 text-sm"
      >
        login
      </Button>
      <Button
        onClick={rHandleOpen}
        variant="gradient"
        className="bg-primary/80 capitalize text-md p-2 text-sm"
      >
        register
      </Button>
      <Login handleOpen={handleOpen} rHandleOpen={rHandleOpen} open={open} />
      <Register
        handleOpen={rHandleOpen}
        rHandleOpen={handleOpen}
        open={rOpen}
      />
    </div>
  );
};

const NavigationBar = () => {
  const location = useLocation();
  const userAuth = useSelector((state: any) => state.auth);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <Navbar
          fullWidth
          className="mx-auto p-2 drop-shadow-xl sticky top-0 z-50"
        >
          <div className="relative mx-auto flex items-center text-blue-gray-900">
            <Link to="/">
              <Typography
                as="a"
                href="#"
                className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
              >
                Jevar-Bazzar
              </Typography>
            </Link>
            <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
              <NavList />
            </div>
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>
            {userAuth.isLoggedIn ? <ProfileMenu /> : <Authentication />}
          </div>
          <MobileNav open={isNavOpen} className="overflow-scroll">
            <NavList />
          </MobileNav>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
