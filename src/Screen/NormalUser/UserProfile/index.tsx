import {
  Avatar,
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
import { Button, Col, Form, Row, Space, Switch, Table } from "antd";
import UploadFileComponents from "../../../Component/Upload/UploadFile";
import ProductModel from "../../../Component/addProductForUser/editProductModel";

const tableHead = ["PRODUCT NAME", "HUID", "BUY-DATE", "TOTAL-PRICE", ""];

const UserProfile = () => {
  const [form] = Form.useForm();
  const userdata = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<any>({});

  const [active, setActive] = React.useState(1);

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

  const getProductImage = async (itemData: any) => {
    setShowProductView(true);
    setViewData(itemData);
    // setimages()
  };
  const columns = [
    {
      title: "HUID",
      dataIndex: "huid",
      key: "huid",
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Buying Date",
      dataIndex: "buying_date",
      key: "buying_date",
    },
    {
      title: "Jeweller",
      dataIndex: "jewellers_name",
      key: "jewellers_name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },

    {
      title: "Bill",
      key: "bill",
      render: (record: any) => (
        <Space size="middle">
          {/* Add any action buttons or links here */}
          <a
            href={`${process.env.REACT_APP_BASE_URL}/${record.bill_image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Bill
          </a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle" onClick={() => getProductImage(record)}>
          View more
        </Space>
      ),
    },
  ];
  const editUser = async (value: any) => {
    const data = {
      address: value.address,
      city: value.city,
      state: value.state,
      name: value.name,
    };
    await API.normalUser_edit(
      userdata.user.user._id,
      userdata.user.token,
      data,
      dispatch
    )
      .then((response) => {
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
        setProduct(response?.data?.filterProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (event: any) => {
    if (event) {
      setSelectImage(event);
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
  useEffect(() => {
    // Set initial values using setFieldsValue
    form.setFieldsValue({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
    });
  }, [user, form]);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getProduct();
  }, [showProductView]);

  // alert(user.profile_image.data)
  return (
    <div className="w-full h-auto lg:p-10">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Avatar
            src={
              user?.profile_image?.data ||
              `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cstyle%3Etext { fill: black; }%3C/style%3E%3Ctext x='50' y='50' font-size='50' text-anchor='middle' dominant-baseline='middle' fill='%23ffffff'%3E${user.name
                ?.charAt(0)
                ?.toUpperCase()}%3C/text%3E%3C/svg%3E`
            }
            alt="avatar"
            variant="rounded"
            withBorder={true}
            color="amber"
            className="p-1 w-64 h-64 cursor-pointer"
            onClick={handleOpen}
          />
        </Col>
        <Col xs={24} lg={16}>
          <Form
            form={form}
            onFinish={editUser}
            initialValues={{
              name: user.name ? user.name : "",
              email: user.email ? user.email : "",
              mobile: user.mobile ? user.mobile : "",
              address: user.address ? user.address : "",
              city: user.city ? user.city : "",
              state: user.state ? user.state : "",
            }}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email-Id" name="email">
                  <Input disabled />
                </Form.Item>
                {!user.is_verify_email && (
                  <Button
                    onClick={OTPSendEmail}
                    className=" bg-light_gold text-primary text-center tracking-wider  flex justify-end"
                  >
                    Verify Email
                  </Button>
                )}
                {user.is_verify_email && (
                  <p className="ml-3 font-roboto_medium text-primary/80 tracking-wide">
                    Email Verified
                  </p>
                )}
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="mobile">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="State" name="state">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className=" bg-light_gold text-primary text-center tracking-wider"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <ProductModel
        data={viewData}
        open={showProductView}
        handel={() => setShowProductView(!showProductView)}
        sellMode={true}
      />
      {/* jewellary details */}
      <p className="mt-7 mb-2 text-xl font-roboto_bold text-primary tracking-wide text-center">
        Product Details
      </p>
      <div className="border-b-2 border-secondry w-48 grid m-auto mb-6" />
      <Table
        dataSource={product}
        columns={columns}
        rowKey="_id"
        pagination={false} // If you want to disable pagination
      />
      {/* pagination */}

      {/* edit profile picture */}
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>Edit your profile picture.</DialogHeader>
        <DialogBody divider>
          <UploadFileComponents handleUpload={handleImageChange} />
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
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
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
