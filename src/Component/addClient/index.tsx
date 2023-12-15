import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";
import { API } from "../../Service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Stores/actions/loader";
import moment from "moment";
import bcrypt from "bcryptjs";
import { logout } from "../../Stores/actions/auth";

const AddClient = (props: any) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.mainAuth);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState("");
  const [status, setStatus] = useState("");
  const [pName, setpName] = useState("");
  const [price, setprice] = useState("");
  const [huide, setHuide] = useState("");
  const [jType, setJType] = useState("");
  const [bill, setBill] = useState("");
  const [acHave, setAcHave] = useState("");
  const [billData, setBillData] = useState<any>(null);

  const addProduct = async (data: any) => {
    const body = {
      user_id: acHave == "have" ? data.id : data.user.id,
      product_name: pName,
      product_type: jType,
      huid: huide,
      price: price,
      bill_image: billData,
      buying_date: moment(),
      jeweller_id: userdata.user.user.id,
      jewellers_name: userdata.user.user.name,
      jewellers_address: userdata.user.user.address,
      city: userdata.user.user.city,
      pincode: userdata.user.user.pincode,
      state: userdata.user.user.state,
      country: "India",
      is_verified: true,
      payment_mode: "offline",
    };
    const token = data.token;
    await API.normalUser_add_product(token, body, dispatch)
      .then((response) => {
        toast.success("Successfully add client.");
        props.handleOpen();
        resetState();
        if (response != undefined) {
          const data = {
            jeweller_id: userdata.user.user.id,
            product_id: response.data.response.id,
            pay_amount: 220,
            is_pay: false,
            created_date: moment(),
          };
          addProductPayment(data);
          dispatch(logout({}));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductAlredyUser = async (data: any) => {
    const huids: any = parseInt(huide);
    const date: any = moment();
    const is_verified: any = true;
    const formData = new FormData();
    formData.append("user_id", data.id);
    formData.append("product_name", pName);
    formData.append("product_type", jType);
    formData.append("huid", huids);
    formData.append("bill_image", billData);
    formData.append("buying_date", date);
    formData.append("price", price);
    formData.append("jeweller_id", userdata.user.user.id);
    formData.append("jewellers_name", userdata.user.user.name);
    formData.append("jewellers_address", userdata.user.user.address);
    formData.append("city", userdata.user.user.city);
    formData.append("pincode", userdata.user.user.pincode);
    formData.append("state", userdata.user.user.state);
    formData.append("country", "India");
    formData.append("is_verified", is_verified);
    formData.append("payment_mode", "offline");
    await API.mainUser_addProduct(userdata.user.token, formData, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success("Successfully add client.");
          props.handleOpen();
          resetState();
          const addId = {
            id: data._id,
            jeweller_id: userdata.user.user.id,
          };
          editClient(addId);

          const datas = {
            jeweller_id: userdata.user.user.id,
            product_id: response.data.response.id,
            pay_amount: 220,
            is_pay: false,
            created_date: moment(),
          };
          addProductPayment(datas);
        } else {
          alert(response?.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductPayment = async (data: any) => {
    await API.mainUser_addProductPayment(userdata.user.token, data, dispatch)
      .then((response) => {
        console.log(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addClient = async (data: any) => {
    dispatch(setLoader(true));
    await API.normalUser_Register(data, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);
          setStatus(response?.data.status);
        } else {
          toast.error("Mobile number alredy exits!");
        }
        dispatch(setLoader(false));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
      });
  };

  const checkOTP = async () => {
    const data = {
      jeweller_id: userdata.user.user.id,
      name: clientName,
      email: email,
      mobile: mobile,
      haveAC: acHave,
      otp: parseInt(OTP),
      addAutoPassword: true,
    };
    await API.confirmOTP(data, dispatch)
      .then((response) => {
        addProduct(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editClient = async (data: any) => {
    await API.normalUser_customer_edit(userdata.user.token, data, dispatch)
      .then((response) => {
        console.log(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCustomer = async () => {
    const data = {
      mobile: mobile,
    };
    await API.mainUser_fetchCustomer(userdata.user.token, data, dispatch)
      .then((response) => {
        addProductAlredyUser(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectBill = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setBill(URL.createObjectURL(img));
      setBillData(img);
    }
  };

  const selectHaveAccount = (event: any) => {
    setAcHave(event);
  };

  const resetState = () => {
    setpName("");
    setHuide("");
    setJType("");
    setBillData({});
    setBill("");
    setClientName("");
    setEmail("");
    setMobile("");
    setOTP("");
    setStatus("");
  };

  return (
    <React.Fragment>
      <Dialog
        size="sm"
        open={props.open}
        handler={props.handleOpen}
        className="bg-transparent shadow-none"
      >
        {/* max-w-[24rem] */}
        <Card className="mx-auto w-full ">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white" className="font-roboto_bold">
              Add Client
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Jewellery Name"
              size="lg"
              color="gray"
              value={pName}
              onChange={(e) => {
                setpName(e.target.value);
              }}
            />
            <div className="sm:flex gap-3">
              <div className="pb-4 sm:pb-0">
                <Input
                  label="HUID"
                  type="text"
                  size="lg"
                  color="gray"
                  value={huide}
                  maxLength={6}
                  onChange={(e) => {
                    setHuide(e.target.value);
                  }}
                />
              </div>
              <Input
                label="Jewellery Type"
                size="lg"
                type="text"
                color="gray"
                value={jType}
                onChange={(e) => {
                  setJType(e.target.value);
                }}
              />
            </div>
            <Input
              label="total price"
              size="lg"
              type="text"
              color="gray"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <div className="flex items-center gap-4 cursor-pointer">
              <p className="capitalize font-roboto_regular">upload bill :</p>
              <input type="file" onChange={selectBill} />
            </div>
            <div className="w-full gap-5">
              <Select label="Select Veriants" onChange={selectHaveAccount}>
                <Option value="have">Alredy have an account</Option>
                <Option value="havn't">No have an account</Option>
              </Select>
            </div>
            {acHave == "havn't" ? (
              <>
                <Input
                  label="Client Name"
                  size="lg"
                  type="text"
                  color="gray"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                  }}
                />
                <div className="sm:flex gap-3">
                  <div className="pb-4 sm:pb-0">
                    <Input
                      label="Email_ID"
                      type="email"
                      size="lg"
                      color="gray"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <Input
                    label="Mobile Number"
                    size="lg"
                    type="text"
                    color="gray"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : (
              <Input
                label="Mobile Number"
                size="lg"
                type="text"
                color="gray"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            )}
            {status === "success" && (
              <>
                <p className="text-left font-roboto_regular">Enter OTP</p>
                <Input
                  label="OTP"
                  size="lg"
                  type="text"
                  color="gray"
                  value={OTP}
                  required
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                />
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                if (acHave == "have") {
                  getCustomer();
                } else {
                  if (status === "success") {
                    if (OTP) {
                      checkOTP();
                    } else {
                      toast.error("OTP is required!");
                    }
                  } else {
                    if (
                      clientName &&
                      email &&
                      mobile &&
                      pName &&
                      huide &&
                      jType &&
                      bill
                    ) {
                      const data = {
                        email: email,
                        mobile: mobile,
                      };
                      addClient(data);
                    } else {
                      toast.error("All Fields are required!");
                    }
                  }
                }
              }}
              fullWidth
              className="bg-secondry font-roboto_black tracking-wider"
            >
              ADD
            </Button>
          </CardFooter>
        </Card>
        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
};

export default AddClient;
