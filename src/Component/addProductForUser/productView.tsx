import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { GrClose } from "react-icons/gr";
import OTPInput from "../OTPInput";
import { API, Image_URL } from "../../Service";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setLoader } from "../../Stores/actions/loader";

interface ProductViewInterface {
  open: boolean;
  handel: () => void;
  data: any;
  images: any;
}

const ProductView: React.FC<ProductViewInterface> = ({
  open,
  handel,
  data,
  images,
}) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.auth);
  const userdatas = useSelector((state: any) => state.mainAuth);
  const [image, setImage] = React.useState<any>([]);
  const [imageData, setImageData] = useState<any>([]);
  const [opens, setOpen] = React.useState(false);
  const [otp, setotp] = useState("");
  const [openImg, setopenImg] = useState(false);
  const [huid, setHuid] = useState("");
  const [editHuid, setEditHuid] = useState(false);
  const [price, setprice] = useState("");
  const [editPrice, setEditPrice] = useState(false);
  // const [images, setimages] = useState([]);
  const [openss, setOpens] = React.useState(false);
  const [setting, setSetting] = useState(false);
  const [proData, setProData] = useState<any>({});
  const [isPrivate, setPrivate] = useState(
    data.is_private == "private" ? "private" : "public"
  );
  const [isLS, setLS] = useState(data.is_lost_or_stolen);
  const [isReport, setReport] = useState(data.is_report == true ? "yes" : "no");

  const [editBill, setEditBill] = useState(false);

  const handleEditOpen = () => setEditBill(!editBill);

  const handleOpens = () => setOpens(!openss);

  const handleOpen = () => setOpen(!opens);

  const handleOpenImg = () => setopenImg(!openImg);

  useEffect(() => {
    // getProduct();
  }, []);

  const privats = (e: any) => {
    setPrivate(e);
  };
  const LS = (e: any) => {
    setLS(e);
  };
  const report = (e: any) => {
    setReport(e);
  };

  const editProduct = async (body: any) => {
    await API.normalUser_edit_product(
      userdata.user.token,
      data._id,
      body,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          alert(response?.data.message);
          setSetting(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = async () => {
    await API.mainUser_getProduct(userdatas.user.token, dispatch)
      .then((response) => {
        const datas = response?.data.response.filter(
          (item: any, index: any) => {
            return item.product_id == data.product_id;
          }
        );
        let imageData: any = [];
        for (const file of data.product_images) {
          const data = {
            original: `${file.original}`,
            thumbnail: `${file.thumbnail}`,
          };
          imageData.push(data);
        }
        // setimages(imageData);
        setProData(datas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkProductForSell = async () => {
    const body = {
      product_buying_date: data.buying_date,
      mobile: userdata.user.user.mobile,
    };
    await API.normalUser_checkProduct_resell(
      body,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          setTimeout(() => {
            handleOpen();
          }, 600);
          alert(response?.data.message);
        } else {
          toast.error("something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOTP = async () => {
    const body = {
      otp: parseInt(otp),
    };
    await API.normalUser_checkProduct_otp(body, userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);
          addProductForSell();
          handleOpen();
        } else if (response?.status == 400) {
          toast.error("Invalid OTP!");
        } else {
          toast.error("something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductForSell = async () => {
    const body = {
      id: data.product_id,
      product_id: data.product_id,
      user_id: userdata.user.user.id,
      jeweller_id: data.product_id,
      is_premium_product: data.is_verified,
      huid: data.huid,
      product_name: data.product_name,
      discription: data.product_type,
      product_image: data.product_images,
      price: data.total_price,
      product_buying_date: data.buying_date,
      user_phone: userdata.user.user.mobile,
      user_email: userdata.user.user.email,
    };
    await API.normalUser_checkProduct_add(body, userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);
        } else {
          toast.error("something went wrong!, Product not add for sell");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage([...image, URL.createObjectURL(img)]);
      setImageData([...imageData, img]);
    }
  };

  const addProductImage = async (data: any, id: string) => {
    await API.normalUser_add_productImage(
      userdata.user.token,
      data,
      id,
      dispatch
    )
      .then((response) => {
        toast.success(response?.data.message);
        setTimeout(() => {
          handleOpens();
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectImage, setSelectImage] = React.useState<any>(null);
  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectImage(event.target.files[0]);
    }
  };

  const editProductByConsole = async (data: any, id: string) => {
    // dispatch(setLoader(true));
    await API.editProductBill(data, id, dispatch)
      .then((response) => {
        setTimeout(() => {
          handleEditOpen();
        }, 300);
        // dispatch(setLoader(false));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(setLoader(false));
      });
  };

  const editproductData = async (data: any, id: string) => {
    await API.editProductdata(data, id, dispatch)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        size="xxl"
        open={open}
        handler={handel}
        className="p-8 overflow-scroll"
      >
        <div
          onClick={handel}
          className="cursor-pointer w-16 h-16 bg-transparent shadow-none absolute top-6 right-5"
        >
          <GrClose className="text-3xl" />
        </div>
        <p className="text-center text-2xl font-roboto_bold capitalize tracking-wide mb-12">
          product details
        </p>
        <div className="flex">
          {images.length != 0 ? (
            <div className="hidden lg:block w-[38rem]">
              <ImageGallery
                items={images}
                showFullscreenButton={true}
                infinite
                showPlayButton={false}
                showNav={false}
                slideDuration={1000}
                thumbnailPosition="left"
              />
            </div>
          ) : (
            <>
              {userdata.isLoggedIn && (
                <div
                  onClick={handleOpens}
                  className="w-36 h-36 flex items-center justify-center border-2 border-dashed cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-16 h-16"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              )}
            </>
          )}
          {images.length != 0 ? (
            <div className="flex items-center justify-center">
              <div className="lg:hidden w-[25rem]">
                <ImageGallery
                  items={images}
                  showFullscreenButton={true}
                  infinite
                  showPlayButton={false}
                  showNav={false}
                  slideDuration={1000}
                  thumbnailPosition="bottom"
                />
              </div>
            </div>
          ) : (
            <>
              {userdata.isLoggedIn && (
                <div
                  onClick={handleOpens}
                  className="w-36 h-36 lg:hidden flex items-center justify-center border-2 border-dashed cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-16 h-16"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              )}
            </>
          )}

          {/* show data */}
          <div className="mx-5 lg:mx-0 lg:ml-12 mt-5 lg:mt-0">
            <div className="flex items-center justify-between">
              <div>
                <text className="block text-xl text-black font-roboto_medium tracking-wide capitalize">
                  {data.product_name}
                </text>
                <div className="flex items-center mt-2">
                  {editHuid ? (
                    <div className="w-96 my-1">
                      <text>HUID No:</text>
                      <Input
                        variant="standard"
                        value={huid}
                        maxLength={6}
                        onChange={(e) => setHuid(e.target.value)}
                        onBlur={() => {
                          // editUser();
                          const datas = {
                            huid: huid,
                          };
                          editproductData(datas, data._id);
                          setEditHuid(false);
                        }}
                      />
                    </div>
                  ) : (
                    <text className="block text-base text-primary font-roboto_black tracking-wide">
                      HUID No: {data.huid}
                    </text>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer ml-10"
                    onClick={() => setEditHuid(true)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              {userdata.isLoggedIn ? (
                <div className="flex items-center">
                  <Button onClick={checkProductForSell} className="bg-red-400">
                    Sell Product
                  </Button>
                  <div
                    className="p-3 bg-primary/20 rounded-lg ml-5 cursor-pointer"
                    onClick={() => setSetting(true)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* border */}
            <div className="border-b-[0.5px] my-5 lg:w-[48rem] border-b-blue-gray-100" />
            {/* price section */}
            <div className="">
              <div className="flex items-center justify-between w-40">
                <text className="font-roboto_regular text-center block">
                  price
                </text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setEditPrice(true)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                {/* <text className="block text-2xl text-primary font-roboto_bold tracking-wide text-center">
                  ₹{data.total_price}
                </text> */}
              </div>
              {editPrice == false ? (
                <p className="text-2xl text-primary font-roboto_bold tracking-wide">
                  ₹{data.total_price}
                </p>
              ) : (
                <div className="w-96 my-1">
                  <Input
                    variant="standard"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    onBlur={() => {
                      // editUser();
                      const datas = {
                        price: price,
                      };
                      editproductData(datas, data._id);
                      setEditPrice(false);
                    }}
                  />
                </div>
              )}
            </div>
            {/* border */}
            <div className="border-b-[0.5px] my-5 lg:w-[48rem] border-b-blue-gray-100" />
            <div className="flex">
              <div>
                <text className="font-roboto_regular text-center block">
                  Product Size
                </text>
                <text className="block text-center mt-1 font-roboto_medium text-primary text-lg">
                  15 CM
                </text>
              </div>
              <div className="ml-10">
                <text className="font-roboto_regular text-center block">
                  How old this Product?
                </text>
                <text className="block text-center mt-1 font-roboto_medium text-primary text-lg">
                  2 year
                </text>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-12 ml-3">
          <div className="">
            <div className="flex items-center">
              <text className="text-xl capitalize font-roboto_regular">
                product bill :
              </text>
              {Object.keys(data).length != 0 && (
                <img
                  src={`${data.bill_image.data}`}
                  alt="bill"
                  className="w-24 h-24 rounded-xl ml-5 cursor-pointer outline-double"
                  onClick={handleOpenImg}
                />
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer ml-10"
                onClick={() => setEditBill(true)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            {/* <div className="my-5">
            <text className="text-lg font-roboto_regular">gst number :</text>
            <div className="w-96 mt-3">
              <text className="ml-3 text-xl font-roboto_medium">
                {data.gst_number}
              </text>
              <Input variant="standard" color="black" label="gst number" value={data.gst_number}  />
            </div>
          </div> */}
            <div className="my-5">
              <text>product type :</text>
              <div className="w-96">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.product_type}
                </text>
                {/* <Input
                variant="standard"
                color="black"
                value={data.product_type}
              /> */}
              </div>
            </div>
            {/* <div className="my-5">
            <text>product color :</text>
            <div className="w-96">
              <Input
                variant="standard"
                color="black"
                value={data.product_color}
              />
            </div>
          </div> */}
          </div>
          <div className="border-l-2 h-96 ml-20" />
          <div className="mx-20">
            <div className="my-5">
              <text className="text-lg font-roboto_regular">buying date :</text>
              <div className="w-96 mt-3">
                {/* <Input color="black" label="buying date" /> */}
                <text className="ml-3 text-xl font-roboto_medium">
                  {moment(data.buying_date).format("YYYY-MM-DD")}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">
                jewellers name :
              </text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.jewellers_name}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">
                jewellers address :
              </text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.jewellers_address}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">city :</text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.city}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">pincode :</text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.pincode}
                </text>
              </div>
            </div>
          </div>
          <div className="border-l-2 h-96 mr-20" />
          <div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">state :</text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.state}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">country :</text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.country}
                </text>
              </div>
            </div>
            <div className="my-5">
              <text className="text-lg font-roboto_regular">
                payment mode :
              </text>
              <div className="w-96 mt-3">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.payment_mode}
                </text>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={opens} handler={handleOpen}>
          <DialogHeader>Verify OTP then Sell Product</DialogHeader>
          <DialogBody divider>
            <OTPInput
              length={6}
              className="otpContainer"
              inputClassName="otpInput"
              isNumberInput
              autoFocus
              onChangeOTP={(otp) => setotp(otp)}
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
              className="bg- bg-primary"
              onClick={verifyOTP}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog
          open={openImg}
          handler={handleOpenImg}
          className="flex items-center justify-center"
        >
          {Object.keys(data).length != 0 && (
            <img
              src={`${data.bill_image.data}`}
              alt="bill"
              className="w-[48rem] h-[48rem] cursor-pointer"
            />
          )}
        </Dialog>
        <ToastContainer />
        <Dialog size="xs" open={openss} handler={handleOpens}>
          <DialogHeader>add your jewellery picture.</DialogHeader>
          <DialogBody divider>
            <input
              onChange={onImageChange}
              type="file"
              name="images"
              accept="image/*"
              className=""
            />
            <div className="flex items-center flex-wrap ml-5">
              {image.map((item: string, index: number) => {
                return (
                  <img
                    src={item}
                    alt=""
                    className="w-14 h-14 mr-3 mb-3 rounded-full cursor-pointer"
                    // onClick={() => {
                    //   setPreview(item);
                    //   setTimeout(() => {
                    //     setIsPreviewOpen(open);
                    //   }, 200);
                    // }}
                  />
                );
              })}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpens}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                const datas = new FormData();
                for (const file of imageData) {
                  datas.append("product_images", file);
                }
                addProductImage(datas, data._id);
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog
          size="sm"
          open={setting}
          handler={() => setSetting(!setting)}
          className="p-8"
        >
          <text className="block text-center text-xl font-roboto_bold capitalize">
            product setting
          </text>
          <div className="border-b-2 w-96 m-auto mt-3 border-b-primary/40" />
          <div className="my-8">
            <div className="w-96 m-auto">
              <Select
                label="Select data show variants"
                value={isPrivate}
                onChange={privats}
              >
                <Option value="private">Private</Option>
                <Option value="public">Public</Option>
              </Select>
            </div>
            <div className="my-5">
              <text className="font-roboto_medium block text-center">
                Product Stolen or Lost
              </text>
              <div className="w-96 m-auto my-5">
                <Select
                  label="Select Lost or Stolen"
                  value={isLS}
                  onChange={LS}
                >
                  <Option value="lost">Lost</Option>
                  <Option value="stolen">Stolen</Option>
                </Select>
              </div>
              <div className="w-96 m-auto">
                <Select
                  label="Select Report Yes or Not"
                  value={isReport}
                  onChange={report}
                >
                  <Option value="yes">yes</Option>
                  <Option value="no">no</Option>
                </Select>
              </div>
            </div>
            <div
              className="rounded-2xl w-40 h-12 bg-primary m-auto flex items-center justify-center cursor-pointer"
              onClick={() => {
                const data = {
                  is_private: isPrivate == "private" ? "private" : "public",
                  is_lost_or_stolen: isLS,
                  is_report: isReport == "yes" ? true : false,
                };
                editProduct(data);
              }}
            >
              <text className="text-xl text-white capitalize font-roboto_medium">
                update
              </text>
            </div>
          </div>
        </Dialog>
        <Dialog size="xs" open={editBill} handler={handleEditOpen}>
          <DialogHeader>Edit your product bill.</DialogHeader>
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
              onClick={handleEditOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                // const datas = {
                //   bill_imag: selectImage,
                // };
                const datas = new FormData();
                datas.append("bill_image", selectImage);
                editProductByConsole(datas, data._id);
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Dialog>
      {/* edit bill */}
    </>
  );
};

export default ProductView;
