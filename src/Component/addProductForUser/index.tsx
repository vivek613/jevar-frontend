import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  parse,
} from "date-fns";
import coin from "../../Assets/coin.png";
import ImagePreview from "./imagePreview";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { API } from "../../Service";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

interface AddProductFromUserInterface {
  paymentData: any;
  open: boolean;
  handel: () => void;
}

const AddProductFromUser: React.FC<AddProductFromUserInterface> = ({
  paymentData,
  open,
  handel,
}) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.auth);
  const [image, setImage] = React.useState<any>([]);
  const [imageData, setImageData] = useState<any>([]);
  const [preview, setPreview] = React.useState("");
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [bill, setBill] = React.useState("");
  const [billData, setBillData] = React.useState<any>(null);
  const [huid, setHuid] = useState("");
  const [pName, setPName] = useState("");
  const [pType, setPType] = useState("");
  const [pColor, setPColor] = useState("");
  const [gst, setGst] = useState("");
  const [price, setPrice] = useState("");
  const [makingCharges, setMakingCharges] = useState("");
  const [buydate, setBuydate] = useState<any>();
  const [jName, setJName] = useState("");
  const [jAddress, setJAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [is_verified, setVerified] = useState<any>(true);

  const onSelect = (e: any) => {
    setPColor(e);
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage([...image, URL.createObjectURL(img)]);
      setImageData([...imageData, img]);
    }
  };

  const chooseBill = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setBill(URL.createObjectURL(img));
      setBillData(img);
    }
  };

  const addProduct = async (data: any) => {
    await API.normalUser_add_product(userdata.user.token, data, dispatch)
      .then((response) => {
        const data = new FormData();
        for (const file of imageData) {
          data.append("product_images", file);
        }
        addProductImage(data, response?.data.response._id);
      })
      .catch((err) => {
        console.log(err);
      });
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
          handel();
          stateClear();
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stateClear = () => {
    setImage([]);
    setHuid("");
    setPName("");
    setPType("");
    setPColor("");
    setGst("");
    setPrice("");
    setMakingCharges("");
    setBuydate("");
    setBill("");
    setJName("");
    setJAddress("");
    setCity("");
    setPincode("");
    setState("");
    setCountry("");
    setImageData([]);
    setBillData(null);
  };

  const [year, setyear] = useState<any>();
  const [month, setmonth] = useState<any>("");
  const [day, setday] = useState<any>("");

  useEffect(() => {
    if (buydate) {
      diffdate();
    }
  }, [buydate]);

  const diffdate = () => {
    const startDateStr: any = buydate;
    const endDateStr: any = moment("YYYY-MM-DD");

    const startDate = parse(startDateStr, "yyyy-MM-dd", new Date());
    const endDate = parse(endDateStr, "yyyy-MM-dd", new Date());

    // Calculate the difference in years, months, and days
    const yearsDifference = differenceInYears(endDate, startDate);
    const monthsDifference = differenceInMonths(endDate, startDate);
    const daysDifference = differenceInDays(endDate, startDate);

    setyear(yearsDifference);
    setmonth(monthsDifference);
    setday(daysDifference);
  };

  return (
    <Dialog
      size="xxl"
      open={open}
      handler={handel}
      className="z-50 overflow-scroll"
    >
      {/* header */}
      <div>
        <p className="text-center my-5 capitalize font-roboto_bold text-black/80 text-xl">
          add your jewellery information
        </p>
        <div className="flex items-center justify-center -mt-3">
          <div className="border-b-2 w-24 mr-3 border-b-yellow-700" />
          <img src={coin} alt="coin" className="w-10 h-10 object-contain" />
          <div className="border-b-2 w-24 ml-3 border-b-yellow-700" />
        </div>
      </div>
      {/* body */}
      <div className="flex justify-center flex-wrap mt-6 md:mt-12">
        <div className="bg-black/10 w-96 h-auto p-5 ">
          <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
            upload jewellery image
          </p>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={onImageChange}
            className="my-4 ml-5"
          />
          <div className="flex items-center flex-wrap ml-5">
            {image.map((item: string, index: number) => {
              return (
                <img
                  src={item}
                  alt=""
                  className="w-14 h-14 mr-3 mb-3 rounded-full cursor-pointer"
                  onClick={() => {
                    setPreview(item);
                    setTimeout(() => {
                      setIsPreviewOpen(open);
                    }, 200);
                  }}
                />
              );
            })}
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              HUID
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={huid}
              maxLength={6}
              onChange={(e) => setHuid(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              jewellery name
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={pName}
              onChange={(e) => setPName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              jewellery type
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={pType}
              onChange={(e) => setPType(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/10 w-96 h-auto p-5 mx-6">
          <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
            upload jewellery's bill
          </p>
          <input
            type="file"
            name="myImage"
            onChange={chooseBill}
            accept="image/*"
            className="my-4 ml-5"
          />
          {bill && (
            <img
              src={bill}
              alt=""
              className="w-14 h-14 mr-3 mb-3 rounded-sm cursor-pointer ml-5"
              onClick={() => {
                setPreview(bill);
                setTimeout(() => {
                  setIsPreviewOpen(open);
                }, 200);
              }}
            />
          )}
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              total price
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              buying date
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              type="date"
              onChange={(e) => setBuydate(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/10 w-96 h-auto p-5">
          <div className="">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              jewellers name
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={jName}
              onChange={(e) => setJName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              jewellers address
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={jAddress}
              onChange={(e) => setJAddress(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              city
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              city's pincode
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              state
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="my-5">
            <p className="capitalize font-roboto_medium text-gray-800 tracking-wide">
              country
            </p>
            <Input
              variant="static"
              className="text-[1.05rem] font-roboto_medium"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center my-5 md:my-0 md:mt-10">
        <Button
          onClick={() => {
            if (
              image.length != 0 &&
              bill &&
              huid &&
              pName &&
              pType &&
              price &&
              buydate &&
              jName &&
              jAddress &&
              city &&
              pincode &&
              state &&
              country
            ) {
              const payment_mode = "online";
              const formData = new FormData();
              formData.append("user_id", userdata.user.user.id);
              formData.append("huid", huid);
              formData.append("product_name", pName);
              formData.append("product_type", pType);
              formData.append("product_color", pColor);
              formData.append("gst_number", gst);
              formData.append("price", price);
              formData.append("making_charges", makingCharges);
              formData.append("bill_image", billData);
              formData.append("buying_date", buydate);
              formData.append("jewellers_name", jName);
              formData.append("jewellers_address", jAddress);
              formData.append("city", city);
              formData.append("pincode", pincode);
              formData.append("state", state);
              formData.append("country", country);
              formData.append("is_verified", is_verified);
              formData.append("payment_mode", payment_mode);
              formData.append("payment_id", paymentData.razorpay_payment_id);

              addProduct(formData);
            } else {
              toast.error("All fields are required!");
            }
          }}
          className="bg-primary md:w-96 w-64 h-12 font-roboto_bold text-lg tracking-wide"
        >
          add product
        </Button>
      </div>
      <ImagePreview
        preview={preview}
        open={isPreviewOpen}
        handleOpen={() => setIsPreviewOpen(!isPreviewOpen)}
      />
      <ToastContainer />
    </Dialog>
  );
};

export default AddProductFromUser;
