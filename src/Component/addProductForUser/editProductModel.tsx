import React, { useEffect, useState } from "react";
import { Col, Modal, Row, UploadFile } from "antd";
import { Form, Input, Upload, Button, Space, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons"; // Assuming you have saved the form in a separate file
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Service";
import { toast } from "react-toastify";
import { CiSettings } from "react-icons/ci";
import { Dialog, Option, Select } from "@material-tailwind/react";
interface ProductViewInterface {
  data: any;
  open: boolean;
  sellMode: boolean;

  handel: () => void;
}
const ProductModel: React.FC<ProductViewInterface> = ({
  data,
  open,
  handel,
  sellMode,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userdata = useSelector((state: any) => state.auth);
  const [setting, setSetting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isPrivate, setPrivate] = useState(
    data.is_private == "private" ? "private" : "public"
  );
  const [image, setImage] = React.useState<any[]>([]);
  const [billFile, setBillFile] = React.useState<any[]>([]);

  const [isLS, setLS] = useState(data.is_lost_or_stolen);
  const [isReport, setReport] = useState(data.is_report == true ? "yes" : "no");
  const onFinish = async (values: any) => {
    console.log("Received values:", values);
    const dataEdit = {
      description: values.description,
      price: values.price,
      product_images: image,
      bill_image: billFile,
      huid: values.huid,
    };
    await API.normalUser_edit_product(
      userdata.user.token,
      data._id,
      dataEdit,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);
          handel();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // Handle form submission logic here
  };
  const privats = (e: any) => {
    setPrivate(e);
  };
  const LS = (e: any) => {
    setLS(e);
  };
  const report = (e: any) => {
    setReport(e);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const addImage = async (data: any, type: number) => {
    await API.Common_add_Image(data, dispatch)
      .then((response) => {
        if (type === 0) {
          setBillFile(response?.data?.data?.thumbnail);
        } else {
          setImage([...image, response?.data?.data?.thumbnail]);
        }

        toast.success(response?.data.message);
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
      product_image: image,
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
  const editProduct = async (body: any) => {
    await API.normalUser_edit_product(
      userdata.user.token,
      data._id,
      body,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response?.data.message);
          setSetting(false);
        }
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
    console.log("event", event);
  };
  const handleImageUpload = (event: any) => {
    if (event) {
      const img = event;
      const data = new FormData();
      data && data.append("image", img);
      addImage(data, 1);
    }
  };
  console.log("data", image);
  useEffect(() => {
    // Set initial values using setFieldsValue
    form.setFieldsValue({
      huid: data?.huid,
      price: data?.total_price,
      bill: [
        {
          uid: "-1",
          name: "bill.pdf",
          status: "done",
          url: `${process.env.REACT_APP_BASE_URL}/${data?.bill_image}`,
        },
      ],
      images: data?.product_images?.map((d: any, index: any) => ({
        uid: `-${index}`,
        name: `Image ${index + 1}`,
        status: "done",
        url: `${process.env.REACT_APP_BASE_URL}/${d}`,
      })),
    });
  }, [data, form]);

  useEffect(() => {
    const urls = data?.product_images?.map((item: any) => item);

    setImage(urls || []);
    setBillFile(data?.bill_image);
  }, [data]);

  return (
    <>
      <Modal
        title="Your Modal Title"
        visible={open}
        onOk={handel}
        width={800}
        onCancel={handel}
        footer={false}
      >
        <>
          {sellMode && (
            <div className="flex items-center justify-end p-3">
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
          )}
          <Form
            name="basic"
            onFinish={onFinish}
            initialValues={{
              huid: data?.huid,
              price: data?.total_price,
              description: "",
              bill: [
                {
                  uid: "-1",
                  name: "bill.pdf",
                  status: "done",
                  url: data?.bill_image,
                },
              ],
              images: data?.product_images?.map((d: any, index: any) => ({
                uid: `-${index}`,
                name: `Image ${index + 1}`,
                status: "done",
                url: `${process.env.REACT_APP_BASE_URL}/${d}`,
              })),
              // ... (other form fields)
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="HUID" name="huid">
                  <Input disabled={sellMode ? true : false} />
                </Form.Item>
              </Col>
              {sellMode && (
                <Col span={12}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input price!",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              )}
              {sellMode && (
                <Col span={12}>
                  <Form.Item label="Description" name="description">
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              )}
              {sellMode && (
                <Col span={12}>
                  <Form.Item
                    label="Bill Upload"
                    name="bill"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setFileList([file]);
                        console.log("file", file);
                        handleFileUpload(file);
                        return false;
                      }}
                      onRemove={(file) => {
                        console.log("file", file);

                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                      }}
                      listType="picture"
                      // maxCount={5}
                    >
                      {" "}
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              )}
              {sellMode && (
                <Col span={12}>
                  <Form.Item
                    label="Multiple Image Upload"
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      beforeUpload={(file) => {
                        setFileList([file]);
                        console.log("file", file);
                        handleImageUpload(file);
                        return false;
                      }}
                      onRemove={(file) => {
                        console.log("file", file);
                        const index1 = image.indexOf(file.url);
                        const newFileList1 = image.slice();
                        newFileList1.splice(index1, 1);
                        setImage(newFileList1);
                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                      }}
                      listType="picture"
                      // maxCount={5}
                    >
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" bg-light_gold text-primary text-center tracking-wider hover:bg-none"
                >
                  Submit
                </Button>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
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
        </>
      </Modal>
    </>
  );
};

export default ProductModel;
