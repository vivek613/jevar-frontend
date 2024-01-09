import React from "react";
import { Dialog } from "@material-tailwind/react";
import { Form, Input, InputNumber, Button } from "antd";
import UploadFileComponents from "../../../Component/Upload/UploadFile";
import { API } from "../../../Service";
const ProfileEdit = (props: any) => {
  const onFinish = (values: any) => {
    props.handleSubmit(values);

    // Handle form submission logic here
  };

  return (
    <React.Fragment>
      <Dialog size="sm" open={props.open} handler={props.handleOpen}>
        <div className="p-5">
          <h2>Profile Edit</h2>
          <Form
            name="userProfile"
            initialValues={props.data} // Use the user data to pre-fill the form
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Profile Picture" name="profile">
              <UploadFileComponents
                handleUpload={props.selectBill}
              ></UploadFileComponents>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary  text-sm"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileEdit;
