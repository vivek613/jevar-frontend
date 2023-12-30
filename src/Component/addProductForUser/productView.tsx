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
import { CiSettings } from "react-icons/ci";
import { Image } from "antd";
import UploadFileComponents from "../Upload/UploadFile";
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

  const [openImg, setopenImg] = useState(false);
  // const [images, setimages] = useState([]);
  const [openss, setOpens] = React.useState(false);
  const [setting, setSetting] = useState(false);
  const [price, setPrice] = useState<any>(data.price || 0);
  const [isPrivate, setPrivate] = useState(
    data.is_private == "private" ? "private" : "public"
  );
  const [isLS, setLS] = useState(data.is_lost_or_stolen);
  const [isReport, setReport] = useState(data.is_report == true ? "yes" : "no");
  const [billData, setBillData] = useState();
  const [editBill, setEditBill] = useState(false);

  const handleEditOpen = () => setEditBill(!editBill);

  const handleOpens = () => setOpens(!openss);

  const handleOpen = () => setOpen(!opens);

  const handleOpenImg = () => setopenImg(!openImg);

  useEffect(() => {
    setPrice(Number(data?.total_price));
  }, []);
  console.log("price", price);
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
          toast.success(response?.data.message);
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
  const addImage = async (data: any, type: number) => {
    await API.Common_add_Image(data, dispatch)
      .then((response) => {
        if (type === 0) {
          setBillData(response?.data?.data?.thumbnail);
        }

        toast.success(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFileUpload = (event: any) => {
    if (event) {
      const img = event;

      const data = new FormData();
      data && data.append("image", img);

      addImage(data, 0);
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
  console.log("data", data);
  return (
    <>
      <Dialog
        size="xxl"
        open={open}
        handler={handel}
        className="p-8 overflow-scroll bg-[#f0f2f5]"
      >
        <div
          onClick={handel}
          className="cursor-pointer w-16 h-16 bg-transparent shadow-none absolute top-6 right-5 bg-[#f0f2f5]"
        >
          <GrClose className="text-3xl" />
        </div>
        <p className="text-center text-2xl font-roboto_bold capitalize tracking-wide mb-12">
          product details
        </p>
        <div className="flex">
          {/* {data?.product_images?.length >= 0 ? ( */}
          <div className="flex items-center justify-center">
            <div className="w-[25rem] h-[30rem]">
              <ImageGallery
                items={data?.product_images}
                showFullscreenButton={true}
                // infinite
                // showPlayButton={false}
                showNav={false}
                slideDuration={1000}
                thumbnailPosition="bottom"
              />
            </div>
            <div
              onClick={handleOpens}
              className="w-36 h-36  flex items-center justify-center border-2 border-dashed cursor-pointer"
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
          </div>

          {/* show data */}
          <div className="mx-5 lg:mx-0 lg:ml-12 mt-5 lg:mt-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mt-2">
                  <Input value={`HUID No: ${data.huid}`} disabled />
                </div>
              </div>

              {userdata.isLoggedIn ? (
                <div className="flex items-center">
                  <Button onClick={addProductForSell} className="bg-red-400">
                    Sell Product
                  </Button>
                  <div
                    className="p-3 bg-primary/20 rounded-lg ml-5 cursor-pointer"
                    onClick={() => setSetting(true)}
                  >
                    <CiSettings />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* border */}
            <div className="border-b-[0.5px] my-5  border-b-blue-gray-100" />
            {/* price section */}
            <div className="">
              <div className="flex items-center justify-between ">
                <Input
                  label="Price"
                  type="number"
                  color="brown"
                  value={price}
                  className="w-20"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="">
                  <p className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
                    Bill upload
                  </p>

                  <UploadFileComponents handleUpload={handleFileUpload} />
                </div>
              </div>
            </div>

            {/* border */}
            <div className="border-b-[0.5px] my-5 lg:w-[48rem] border-b-blue-gray-100" />
            <div className="flex">
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
              {Object.keys(data).length != 0 && (
                <img
                  src={`${data.bill_image.data}`}
                  alt="bill"
                  className="w-24 h-24 rounded-xl ml-5 cursor-pointer outline-double"
                  onClick={handleOpenImg}
                />
              )}
            </div>

            <div className="my-5">
              <text>product type :</text>
              <div className="w-96">
                <text className="ml-3 text-xl font-roboto_medium">
                  {data.product_type}
                </text>
              </div>
            </div>
          </div>
        </div>

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
      <ToastContainer />
      {/* edit bill */}
    </>
  );
};

export default ProductView;
