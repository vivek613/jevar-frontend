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
  Select,
  Option,
} from "@material-tailwind/react";
import { API } from "../../Service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Stores/actions/loader";
import moment from "moment";
import { logout } from "../../Stores/actions/auth";
import UploadFileComponents from "../Upload/UploadFile";

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

  const [acHave, setAcHave] = useState("");
  const [billData, setBillData] = useState<any>(null);

  const addProduct = async (data: any) => {
    const huids: any = huide;
    const date: any = moment();
    const is_verified: any = true;
    const formData = new FormData();
    formData.append("user_id", data?.user?.id);
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
    const token = data.token;
    await API.mainUser_addProduct(
      token,
      formData,

      dispatch
    )
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
    const body = {
      user_id: data,
      purchase_from: pName,
      product_type: jType,
      huid: huide,
      price: price,
      bill_image: billData || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAVFBMVEXu7u7///+fn5/MzMyioqL09PTx8fH6+vr39/d1dXVwcHDBwcHJyclra2ucnJy9vb3V1dWwsLDm5uaqqqre3t63t7dkZGSLi4uSkpJ9fX2EhIRfX18c5fc1AAALIUlEQVR4nO2biXKruhJFwUIDQoAmBuP//8+3m8Exzskxsp17361yV6XMIGClu7XVYsiy/0cTr55AKfXyOb7bq6eUOZnkb4H5shexeJ5ztZKJN3rtxVPluaqM9SuZepvTXsaKbQVjfonmu8L5GpbIc1Mt1plIISV7g9New5KIYYUotuSytjU2LmRSqn8TK899W7U+l5mtNoti8VnOXzj3S1hwjW2rbqHIIjOL1yqbia0PPHn+l7BUrkBi8s2Et1VHHmsN25wmnyJ7CUvmWdt2Mb81HrdOAKdt3TP5Kq9gwR+xa9ssvzPu7TWccUVTPKl7voKF1KLL83ssIsui6dolnHbllglOewVL5tK1nf0D1eKgyNZotixTq9P+ASzIQ9d2/icsovCWreFkSzgPhvIVbUEMu66Tf8EiMrGFs2KWQ+F+GwvZAqrq71RLVnk2d89ZeH8fy3ed28uDzH5wnqJxwGS/j4UYWmCp24tzG69jz71hmGLy97Eg8dVNDGUmVB5NZtsfsBBGdNqD13seCxLvOrfKQxat8TZKYIX4RyrZVSS8B0/+NBZJvHNukQeM0oxx4zznzHWUduJeZElLfl+36LKVc5WaMwpQzKrWOauMc4Hl8N19DNuWHY7hk1icU2YH54xUuSBXMRZ9B6KqCwgsOP3eXbIi4T2Y8M9gCSG8CY3MPbCiZzZCyhkznmLqXIf5BqhM9Lsu6VFqqN/CEjzzti3GpnEICyBUBAFGY8LyLTqmR6Fq5pgKxPLLoCWQh8NVRAKWQOiMC01zOp1G9EDErJPkqMUizSykX6CAlSPCXzE0c112+GoJORgr8BAT/Yjcuy5YYa5YNOL5mzWJLnnFEl3XHpb4w1gCKnkaVySiwgBtgwvIsi9v0ch3XTNRuJuBKbqukofl4bC3uuaLibAYulYITrIbs+Z2jXpA9yUPSK2EGB7D4mwHBYuQ+BCY3JHsjATMXUtEjAf+sMQfxYKz9lSB57EIwfsfsazqSC5W8aJhKk9IrYNYbo/VIDoUQ2F/ojJMWRhbtR4jUpUSw2NYorrDQi7DWZX65qMYo52NtFRizi9lxqWs5rrsONVBLLuP4Yjq4RSCzfYxNLvaKyfxNygqjM86CmfKbYmDjr1LLXStEIrsPrVW6VSKZoXRLKi+EuiUVYLEH8ZSu5yHPOTohyG/T6g5wUVlZtviKg2VGvbwpCcBS9gdVoZhOhSG3/fDRQ/ufCgEn+uyhH54fPC5wWogD7YoGsgDOcV8mVV/4LISpUYnfgfrRiIaA4k/FUH9OEPccRmFGJokeTiMJcyNu2wuQnEyP0HRWLPzFgbPNHk4jhWLr36I6qEpiu7bnZqveuEGC/KAPEwZphOwMh82d80SfyqQXKc2Xmerarst7yFXu9wSLIQurR8m1FvtFQvyQFQwZH+7jC9z2bzZvnuqDsKbmFrHsa5CP/I8a4obC62XmMuzP5tFqVGkVIBJWF8SUWDk3WHBaQinl5zCdy9lNJ8NmFwk3hA/jMXdVR5yLBZ31hQdxj8p4h2YkRimUuUhAUuspWDj82zulfdgZJ1VkkeiucZQYZSKqTFMmfk0V4m/xvObNafOesF9XMNpMn9CXfabWHMUG5Rz++rrnuxUuDZyhJPIjDJFujwkYc1CDyyMPM1fwYgNxZjCpNHmWLaJEp+EtUhE4xTdc+yK8QEZWrIoZHYqmoRJfjoWhH6LIj2XiG2zJ/uORuF0+E2PYQoWX2rBpkB8lvmMCcXDcBanpAniE1ibRDSNM+uDQ8y2w46s+K5o/nexMn+9PkiCs/MwDXE3p3GPtjMUHOnPPFOwVLgNWDOOhVkfHHLWwWl/RDtVT6RWEhY393P+pgnV+qRJWOP+1DufkYfE225+PN0bXFQ4tvhMZYx81uzJEicXT2Bl4d5dWzxP1VoRKvSBndqGZ2KYhnU/6d+TbY9hMey4q6Y16dVDOpb9wVvY7KxHi+3NFmXdEs7x+COCp7FWob9nKhzy/vqkXMi1vo+Vg3Icf0TwPJa4u6OE2DUdi9nd03u+Ok15G59KrVSsW4mgTthauk//p6Z8mxM90Q+TsbLxyhRQJYu/vlImlHz2rZbEXsKrcel2LTL8nS9s3VnqmTEZLULlf4jc2yz57JyjVv9dpuwNryz+jn2wUuyDlWIfrBT7YKXYByvFPlgp9sFKsQ9Win2wUuyDlWL/YSyu1PIzNxZq932WmFe2TbRzO0Z8tVDzxyzzgjr0XcsBLN65QDeJWmcIwLtxDPY6h48hYM7vnDOcbmPSi3nrMXYB5TaMY1HRg+Wwvj34FixZ1vWIa02XQmUi9LXWdT+sRwp7uVRc1nV9xlTbn7EgaSt+J+ITccIBZX3ppWAX3ff9BQ3fgnUuS215NtVB8bbWDWNB16f1eAAYLks0qTivNBYIK9BCxMnFWdfBWBPOEk11Mb/W+PiaR7GabMZSutSCc3HS5RqjDWuoxywb62HG8oNuRu14hn+jdhwm4Es0ZfJtuSXPOkzaCGBJ/MNuzqGybndYuht6a/uh08ASTJcx1IPPxKgpZh5GTXWo2pYduOYhrNqxy5QNwGK6bjnBYFu2w3Ksb5qeOcLip/osjdZw6KgHYJ3GcYjc9mWN3GoOuOsYVhBjX42zt+qOvMXKutt7y2WI35DNWBl8qnipC8KagDVp3VsFbzXoidXbvBW4LUsKIi44SOr/Wps9VpAdkCVyXSKhymkCZZ2pQmvGMxX72nI0te/MLXgra5DsSPlR10ZJe56dsMNScRiiIiw1lKQEdYmmsdfnKCVhKWo6Z9n7sISF+ASV+bPWZ/yRDxasvgcWVIDTTUseap1bRJj2TfWgeAfVOp/BGTnrSxKSc3yLbqlxQnrLME3ohMKH4VxOzSbzSP6JCTXQvozelpiGvJ2GWbLmX86a6Xyexg5Np4FsfA+W8HH2e5zdDymPMd4ch5VrEyhW9F8r8y9HCyzw5QzvC+K3Q/b3cx/f3L0e8OaXh/95+2Cl2H8Yi89fYorte8xtja9rYtu2nvFrD+frg4Xtd9553foiFkZ9Kkvadj4gYi2jtYquzqvWzGtbtxds2zN/mGgibTNoNO+07foZ5ctYvKrrvlCoLS90OXXqa4jk0Nc1DT+y7CfOu/5iN3+gQO3nPShQL5deB5xi6ocZm6O2pQJ1fB1LFKg0z4LKgAFFs5/qgrQdowhV7SjGBs5bXa9YNKaXJRU/GCcHy8YSe/igxwXLaR1g7ctYIp7LZkJFLFAXWCFQFxsuXD00cyV1jyVQ/Y2avAGsUaJA680Oq+dHHjI+xqpqHcf6hOQ6a9RaJ6odUBQHVpbsO5YfamdKqqipkDamoZH5FqtGdrX20WUfYuGUQ+7mYR9e8KggkGco6JiY6507LKpzbIbSdcYqUWmUKK5vsWhb7R7VXA+xUSkZHql0x7xG24ryWTVac46c+5ZbqMdKxeEiCmI5dd1J99U+txp6OeJVb6Gu02PTIH3REuXnoM+YQtTluWmGsmdijyWyft1jxZxbihJf7XIrOzKxfoAlsvMSirKPmYQX4DZMB+t146CuWHMRpdp1jx4JaBSCaz3tsY7UNY+weFXqlj5H0XNKobxcMnigb1RQicYNi2ShnNAVRtqD+HoE8XxqMHtF+Id5tz5JtzQcHrE9CmLTnyNHvTT2Gpp17vsGaa0vDtswZehDvsppTXZu9aWjPazvuxwbUNAPLcnpvPsy5uFCC/30KtZW5e1+ritiXRE3drvndsPttkcX/S9XEP+CfbBS7IOVYh+sFPtgpdgHK8U+WCn2wUqxD1aKfbBS7IOVYh+sFPt/xfoflGexW5GVwokAAAAASUVORK5CYII=",

      buying_date: moment(),
      jeweller_id: userdata.user.user.id,
      jewellers_name: userdata?.user?.user?.name,
      jewellers_address: userdata.user.user.address,
      city: userdata.user.user.city,
      pincode: userdata.user.user.pincode,
      state: userdata.user.user.state,
      country: "India",
      is_verified: true,
      payment_mode: "offline",
    };
    await API.mainUser_addProduct(userdata.user.token, body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);

          props.handleOpen();
          resetState();
          const addId = {
            id: data,
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
          toast.success(response?.data.message);
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
        console.log("respoe", response);
        addProductAlredyUser(response?.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductImage = async (data: any) => {
    await API.Common_add_Image(data, dispatch)
      .then((response) => {
        setBillData(response?.data?.data?.thumbnail);

        toast.success(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const selectBill = (event: any) => {
  //   if (event) {
  //     const img = event;

  //     // const data = new FormData();
  //     // data && data.append("image", img);
  //     setBillData(img)
  //     // addProductImage(data);
  //   }
  // };
  const selectBill = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      // setBill(URL.createObjectURL(img));
      setBillData(img);
    }
  };
  console.log("bill", billData)
  const selectHaveAccount = (event: any) => {
    setAcHave(event);
  };

  const resetState = () => {
    setpName("");
    setHuide("");
    setJType("");
    setBillData("");
    setClientName("");
    setEmail("");
    setMobile("");
    setOTP("");
    setStatus("");
    setprice("");
    setAcHave("");
  };

  useEffect(() => {
    resetState();
  }, [props]);

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
            className="mb-4 grid h-24 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white" className="font-roboto_bold">
              Add Client
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <Input
              type="text"
              label="Register By"
              size="lg"
              color="gray"
              // value={pName}
              defaultValue={userdata?.user?.user?.name}
              disabled={true}
            />
            <Input
              type="text"
              label="Purchased From"
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
                  // maxLength={6}
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
              label="Jewellery Price"
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

              {/* <UploadFileComponents
                handleUpload={selectBill}
              ></UploadFileComponents> */}
              <input type="file" onChange={selectBill} />
            </div>
            <div className="w-full gap-5">
              <Select label="Select User Type" onChange={selectHaveAccount}>
                <Option value="have">Old User</Option>
                <Option value="havn't">New User</Option>
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
                      jType
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
