import React, { useState } from "react";
import { Form, Button } from "antd";
import { Input, Textarea } from "@material-tailwind/react";
import UploadFileComponents from "../../Component/Upload/UploadFile";
import { API } from "../../Service";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const AddCarrer = () => {
  const dispatch = useDispatch();
  const [resumeImage, setResumeImage] = useState();
  const onFinish = (values) => {
    console.log("aadharImage", resumeImage);
    console.log("values:", values);
    // const body = {
    //   name: name,
    //   email: email,
    //   mobile: mobile,
    //   address: address,
    //   city: city,
    //   salesId: selectUser,
    //   state: state,
    //   pincode: pincode,
    //   password: password,
    //   otp: otp,
    // };
    // await API.mainUser_verify(body, dispatch)
    //   .then((response) => {
    //     if (response?.status == 200) {
    //       toast.success(response?.data.message);
    //       dispatch(login(response?.data.data));
    //       navigation("/");
    //     } else {
    //       console.log("dddd", response);
    //       toast.info(response?.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //     console.log(err);
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const addProductImage = async (data, type) => {
    console.log("data", data);
    await API.Common_add_Image(data, dispatch)
      .then((response) => {
        console.log(response);
        setResumeImage(response?.data?.data?.thumbnail);
        toast.success(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onImageChange = (event) => {
    console.log("event", event);
    if (event) {
      const img = event;
      const data = new FormData();
      data && data.append("image", img);
      console.log("data", data.get("image"));
      addProductImage(data.get("image"), 0);
    }
  };
  return (
    <div className="w-full h-screen lg:flex/2 mt-10 ">
      <div className="h-screen lg:w-[85rem]  pl-20  shadow-md rounded-lg">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input label="Name" color="brown" />
          </Form.Item>

          <Form.Item
            name="mobile_no"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
              },
            ]}
          >
            <Input label="Mobile Number" color="brown" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input label="Email" color="brown" />
          </Form.Item>
          {/* 
          <Form.Item
            name="resume"
            rules={[
              {
                required: true,
                message: "Please upload your resume!",
              },
            ]}
          >
            <Input type="file" label="Resume" color="brown" />
          </Form.Item> */}
          <div className="mb-8">
            <p className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
              Resume
            </p>

            <UploadFileComponents handleUpload={onImageChange} />
          </div>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Textarea label="address" color="brown" />
          </Form.Item>

          <Form.Item
            name="experience"
            rules={[
              {
                required: true,
                message: "Please input your experience!",
              },
            ]}
          >
            <Textarea color="brown" label="Experience" />
          </Form.Item>

          <Form.Item>
            <Button
              variant="gradient"
              htmlType="submit"
              className="bg-primary w-64 text-white mt-5"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCarrer;
