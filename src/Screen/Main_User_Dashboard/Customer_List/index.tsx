import {
  Tooltip,
  IconButton,
  Typography,
  Select,
  Option,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, Image_URL } from "../../../Service";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const heading = [
  // "no",
  "name",
  "mobile",
  "email",
  "",
];

interface CustomerListInterface {}

const CustomerList: React.FC<CustomerListInterface> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.mainAuth);
  const [active, setActive] = React.useState(1);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    if (userdata) {
      getCustomer();
    }
  }, []);

  const getCustomer = async () => {
    await API.mainUser_customerList(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          setCustomer(response.data.response);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="w-full h-auto pb-5">
      {/* filter */}
      {customer.length != 0 ? (
        <>
          {/* <div className="lg:flex items-center justify-between mx-6 lg:mx-16 mt-5">
            <div>
              <text className="text-sm text-blue-gray-900 ">
                Serach By Name
              </text>
              <div className="w-72 mt-3">
                <Input label="Search" color="blue-gray" />
              </div>
            </div>
            <div className="lg:ml-5">
              <text className="text-sm text-blue-gray-900 ">
                Monthly Filter
              </text>
              <div className="w-72 mt-3">
                <Select label="Select Version" color="blue-gray">
                  <Option>January</Option>
                  <Option>March</Option>
                </Select>
              </div>
            </div>
          </div> */}
          <div className="relative overflow-x-auto border-2 sm:rounded-lg mt-5 lg:mx-16">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {heading.map((item, index) => {
                    return (
                      <th scope="col" className="px-6 py-3 text-left">
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {customer.map((item: any, index) => {
                  const queryParams = new URLSearchParams(item).toString();
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        {item.profile_image != undefined ? (
                          <Avatar
                            size="md"
                            alt="avatar"
                            src={`${item.profile_image.data}`}
                            className="ring-4 ring-green-500/30 border border-green-500 shadow-xl shadow-green-900/20 object-contain"
                          />
                        ) : (
                          <div className="border-2 w-10 h-10 outline-2 rounded-full flex items-center justify-center">
                            <text className="font-roboto_black uppercase text-xl text-gray-700">
                              {item.name.charAt(0)}
                            </text>
                          </div>
                        )}
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {item.name}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.mobile}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-5">
                        <button
                          // onClick={() => {
                          //   navigate(`/user-details/${item}`);
                          // }}
                          className="text-blue font-roboto_medium"
                        >
                          <Link to={`/user-details?${queryParams}`}>More</Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {customer.length >= 6 && (
            <div className="flex items-center justify-center gap-8 mt-6">
              <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={prev}
                disabled={active === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
                <strong className="text-blue-gray-900">10</strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={next}
                disabled={active === 10}
              >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-screen fixed flex items-center justify-center">
          <text className="text-xl font-roboto_medium">Data not found</text>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerList;
