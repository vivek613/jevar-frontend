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
import { ToastContainer, toast } from "react-toastify";
import OTPInput from "../../../Component/OTPInput";
import moment from "moment";

const tableHead = ["PRODUCT NAME", "HUID", "BUY-DATE", "TOTAL-PRICE", ""];

const UserProfile = () => {
  const userdata = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<any>({});
  const [image, setImage] = React.useState<any>(null);
  const [active, setActive] = React.useState(1);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [editName, setEditName] = React.useState(false);
  const [editAddress, setEditAddress] = React.useState(true);
  const [editCity, setEditCity] = React.useState(true);
  const [editState, setEditState] = React.useState(true);
  const [product, setProduct] = React.useState<Array<any>>([]);
  const [showProductView, setShowProductView] = React.useState(false);
  const [viewData, setViewData] = React.useState({});
  const [selectImage, setSelectImage] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [images, setimages] = React.useState<any>([]);
  const handleOpen = () => setOpen(!open);
  const handleOpenEmail = () => setOpenEmail(!openEmail);

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
    setAddress(user.address);
    setState(user.state);
    setCity(user.city);
  }, []);

  const getProductImage = async (itemData: any) => {
    await API.mainUser_getProduct(userdata.user.token, dispatch)
      .then((response) => {
        const datas = response?.data.response.filter(
          (item: any, index: any) => {
            return item.product_id == itemData.product_id;
          }
        );
        let imageData: any = [];
        for (const file of itemData.product_images) {
          const data = {
            original: `${file.original}`,
            thumbnail: `${file.thumbnail}`,
          };
          imageData.push(data);
        }
        setimages(imageData);
        setShowProductView(true);
        setViewData(itemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editUser = async () => {
    const data = {
      address: address,
      city: city,
      state: state,
      name: name,
    };
    await API.normalUser_edit(
      userdata.user.user._id,
      userdata.user.token,
      data,
      dispatch
    )
      .then((response) => {
        // alert(response?.data);
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async () => {
    await API.normalUser_profile(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        setUser(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = async () => {
    await API.normalUser_get_product(
      userdata.user.token,
      userdata.user.user._id,
      dispatch
    )
      .then((response) => {
        const filter = response?.data.filterProduct.filter(
          (item: any, index: any) => {
            return item.is_product_sell == false;
          }
        );
        setProduct(filter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("profile_image", selectImage);
    await API.normalUser_addImage(
      userdata.user.user._id,
      userdata.user.token,
      formData,
      dispatch
    )
      .then((response) => {
        getUser();
        if (open) {
          handleOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   if (selectImage != "" && userdata.user.user.profile_image.length == 0) {
  //     // handleSubmit();
  //   }
  // }, [selectImage, userdata.user.user.profile_image.length]);

  const OTPSendEmail = async () => {
    const body = {
      id: userdata.user.user._id,
      email: userdata.user.user.email,
    };
    await API.normaluser_EmailSendOTP(body, userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          handleOpenEmail();
          setTimeout(() => {
            toast.success(response?.data.message);
          }, 2000);
        } else {
          toast.success("something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OTPConfirmEmail = async () => {
    const body = {
      id: userdata.user.user._id,
      otp: parseInt(otp),
    };
    await API.normaluser_EmailConfirmOTP(body, userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          handleOpenEmail();
          setTimeout(() => {
            toast.success(response.data.message);
            getUser();
          }, 1000);
        } else if (response?.status == 400) {
          toast.error("invalid OTP!");
        } else {
          toast.error("somthing went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // alert(user.profile_image.data)

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
              onClick={handleOpen}
            />
          ) : (
            <div className="w-64 h-64">
              <input
                onChange={handleImageChange}
                type="file"
                name="profile_image"
                accept="image/*"
                className="w-64 h-64"
              />
              {selectImage && (
                <button
                  onClick={handleSubmit}
                  className="bg-primary p-2 rounded-lg text-white"
                >
                  upload
                </button>
              )}
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
              onClick={handleOpen}
            />
          ) : (
            <div className="w-64 h-64">
              <input
                onChange={handleImageChange}
                type="file"
                name="profile_image"
                accept="image/*"
                className="w-64 h-64"
              />
              {/* {selectImage && (
                <button onClick={handleSubmit} className="bg-primary">
                  upload
                </button>
              )} */}
            </div>
          )}
        </div>
        <div className="lg:flex w-full bg-white lg:ml-12 border-2 rounded-lg p-5">
          <div>
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide">
                Name
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEditName(true)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            {editName == false ? (
              <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide w-auto">
                {user.name}
              </p>
            ) : (
              <div className="w-96 my-1">
                <Input
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => {
                    editUser();
                    setEditName(false);
                  }}
                />
              </div>
            )}
            {/* <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {user.name}
            </p> */}
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Email-Id
            </p>
            <div className="flex items-center">
              <p className="ml-3 font-roboto_black text-xl text-gray-800 tracking-wide">
                {user.email}
              </p>
              {user.is_verify_email ? (
                <p className="ml-7 font-roboto_medium text-primary/80 tracking-wide">
                  {/* verified */}
                </p>
              ) : (
                <Button
                  onClick={OTPSendEmail}
                  className="ml-7 bg-light_gold text-primary py-2 px-4 tracking-wider"
                >
                  verify
                </Button>
              )}
            </div>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Phone Number
            </p>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {user.mobile}
            </p>
          </div>
          <div className="border-b-2 lg:border-r-2 h-54 mx-12 my-5 lg:my-0" />
          <div>
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mr-4">
                Address
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEditAddress(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            {editAddress ? (
              <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide w-auto">
                {user.address}
              </p>
            ) : (
              <div className="w-96 my-1">
                <Input
                  variant="standard"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => {
                    editUser();
                    setEditAddress(true);
                  }}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
                City
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEditCity(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            {editCity ? (
              <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
                {user.city}
              </p>
            ) : (
              <div className="w-96 my-1">
                <Input
                  variant="standard"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => {
                    editUser();
                    setEditCity(true);
                  }}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
                State
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEditState(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            {editState ? (
              <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
                {user.state}
              </p>
            ) : (
              <div className="w-96 mt-1">
                <Input
                  variant="standard"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onBlur={() => {
                    editUser();
                    setEditState(true);
                  }}
                />
              </div>
            )}
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
              {product.map((item: any, index: number) => {
                return (
                  <tr className="bg-white border-b">
                    <td
                      scope="row"
                      className="px-6 py-2 text-[1rem] font-roboto_medium text-gray-900 whitespace-nowrap capitalize"
                    >
                      {item.product_name}
                    </td>
                    <td className="px-6 py-2 text-[1rem] font-roboto_regular text-gray-600">
                      {item.huid}
                    </td>
                    <td className="px-6 py-2 text-[1rem] font-roboto_regular capitalize text-gray-800">
                      {moment(item.buying_date).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-2 text-[1rem] font-roboto_regular text-gray-800">
                      {item.total_price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue font-roboto_medium"
                        onClick={() => {
                          getProductImage(item);
                          // alert(item._id)
                        }}
                      >
                        More
                      </button>
                    </td>
                  </tr>
                );
              })}
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
        images={images}
      />
      {/* edit profile picture */}
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>Edit your profile picture.</DialogHeader>
        <DialogBody divider>
          <input
            onChange={handleImageChange}
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
              handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* email otp */}
      <Dialog open={openEmail} size={"xs"} handler={handleOpenEmail}>
        <DialogHeader className="text-center block">
          Email Verification
        </DialogHeader>
        <DialogBody divider className="flex items-center justify-center">
          <OTPInput
            length={6}
            className="otpContainer"
            inputClassName="otpInput"
            isNumberInput
            autoFocus
            onChangeOTP={(otp) => setOtp(otp)}
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
        </DialogBody>
        <DialogFooter className="flex items-center justify-center">
          <Button onClick={OTPConfirmEmail} className="bg-secondry">
            confirm
          </Button>
        </DialogFooter>
        <ToastContainer />
      </Dialog>
    </div>
  );
};

export default UserProfile;
