import {
  Avatar,
  Button,
  IconButton,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, Image_URL } from "../../../Service";
import ProductView from "../../../Component/addProductForUser/productView";
import { useLocation } from "react-router-dom";
import moment from "moment";

const tableHead = ["JEWELLERY NAME", "HUID", "TOTAL-PRICE", "Buying-Date", ""];

const UserDetails = () => {
  const userdata = useSelector((state: any) => state.mainAuth);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<any>({});
  const [image, setImage] = React.useState<any>(null);
  const [active, setActive] = React.useState(1);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [editAddress, setEditAddress] = React.useState(true);
  const [editCity, setEditCity] = React.useState(true);
  const [editState, setEditState] = React.useState(true);
  const [product, setProduct] = React.useState([]);
  const [showProductView, setShowProductView] = React.useState(false);
  const [viewData, setViewData] = React.useState({});
  const [selectImage, setSelectImage] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleOpen = () => setOpen(!open);

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  useEffect(() => {
    getUser();
    getProduct();
  }, []);

  const getProduct = async () => {
    const id = queryParams.get("id");
    await API.mainUser_getProduct(userdata.user.token, dispatch)
      .then((response) => {
        const data = response?.data.response.filter((item: any, index: any) => {
          return item.user_id == id;
        });
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async () => {
    const id = queryParams.get("id");
    await API.normalUser_profile(id, userdata.user.token, dispatch)
      .then((response) => {
        setUser(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-auto lg:p-10">
      <div className="lg:flex">
        <div className="hidden lg:block">
          {user.profile_image != undefined ? (
            <Avatar
              src={`${user.profile_image.data}`}
              alt="avatar"
              variant="rounded"
              withBorder={true}
              color="amber"
              className="p-1 w-64 h-64 cursor-pointer"
            />
          ) : (
            <div className="w-64 h-64 border-2 rounded-lg flex items-center justify-center">
              <text className="text-6xl uppercase font-roboto_black">k</text>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center lg:hidden my-5">
          {image ? (
            <Avatar
              src={`${user.profile_image.data}`}
              alt="avatar"
              variant="rounded"
              withBorder={true}
              color="amber"
              className="p-1 w-36 h-36"
            />
          ) : (
            <div className="w-36 h-36 border-2 rounded-lg flex items-center justify-center">
              <text className="text-6xl uppercase font-roboto_black">k</text>
            </div>
          )}
        </div>
        <div className="lg:flex w-full bg-white lg:ml-12 border-2 rounded-lg p-5">
          <div>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide">
              Name
            </p>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("name")}
            </p>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Email-Id
            </p>
            <div className="flex items-center">
              <p className="ml-3 font-roboto_black text-xl text-gray-800 tracking-wide">
                {queryParams.get("email")}
              </p>
            </div>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Phone Number
            </p>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("mobile")}
            </p>
          </div>
          <div className="border-b-2 lg:border-r-2 h-54 mx-12 my-5 lg:my-0" />
          <div>
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mr-4">
                Address
              </p>
            </div>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide w-auto">
              {queryParams.get("address") ? queryParams.get("address") : "none"}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
                City
              </p>
            </div>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("city") ? queryParams.get("city") : "none"}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
                State
              </p>
            </div>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("state") ? queryParams.get("state") : "none"}
            </p>
          </div>
        </div>
      </div>
      {/* jewellary details */}
      <p className="mt-7 mb-2 text-xl font-roboto_bold text-primary tracking-wide text-center">
        Product Details
      </p>
      <div className="border-b-2 border-secondry w-48 grid m-auto mb-6" />
      {product.length != 0 ? (
        <div className="relative overflow-x-auto border-2 sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {tableHead.map((item, index) => {
                  return (
                    <th scope="col" className="px-6 py-3">
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {product.length != 0 && (
                <>
                  {product.map((item: any, index: number) => {
                    return (
                      <tr className="bg-white border-b">
                        <td
                          scope="row"
                          className="px-6 py-2 text-[1rem] font-roboto_medium text-gray-900 whitespace-nowrap capitalize"
                        >
                          {item.product_type}
                        </td>
                        <td className="px-6 py-2 text-[1rem] font-roboto_regular text-gray-600">
                          {item.huid}
                        </td>
                        <td className="px-6 py-2 text-[1rem] font-roboto_regular text-gray-800">
                          {item.total_price}
                        </td>
                        <td className="px-6 py-2 text-[1rem] font-roboto_regular text-gray-800">
                          {moment(item.buying_date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="text-blue font-roboto_medium"
                            onClick={() => {
                              setTimeout(() => {
                                setShowProductView(true);
                              }, 600);
                              setViewData(item);
                            }}
                          >
                            More
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="m-auto text-center mt-[5rem]">
            Product are not available!
          </p>
        </div>
      )}
      {/* pagination */}
      {product.length >= 6 && (
        <div className="flex items-center justify-center mt-8 gap-8">
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
      <ProductView
        open={showProductView}
        handel={() => setShowProductView(!showProductView)}
        data={viewData}
        images={[]}
      />
      {/* edit profile picture */}
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>Edit your profile picture.</DialogHeader>
        <DialogBody divider>
          <input
            // onChange={handleImageChange}
            type="file"
            name="profile_image"
            accept="image/*"
            className=""
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              // handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UserDetails;
