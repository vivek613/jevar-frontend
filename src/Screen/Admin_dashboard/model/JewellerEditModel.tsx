import { Dialog } from "@material-tailwind/react";
import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

const JewellerEditModel = (props: any) => {
  console.log("props", props);
  const onFinish = (values: any) => {
    props.handleSubmit(values);

    // Handle form submission logic here
  };
  return (
    <React.Fragment>
      <Dialog size="sm" open={props.open} handler={props.handleOpen}>
        <div className="p-5">
          <h2>Jeweller Edit</h2>
          <Form
            name="userProfile"
            initialValues={props.data} // Use the user data to pre-fill the form
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="" name="id">
              {/* <InputNumber style={{ width: "100%" }} disabled /> */}
            </Form.Item>

            <Form.Item label="Total Amount" name="totalPayment">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Mobile" name="mobile">
              <Input />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input.TextArea />
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

export default JewellerEditModel;
