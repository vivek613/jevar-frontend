import React from "react";
import { Modal } from "antd";
import TableComponents from "../../../Component/Table/Table";
const GraphModel = (props: any) => {
  const xData = Object.keys(props.data);
  const TableData = xData.map((key) => props.data[key]);
  const handleCancel = () => {
    props.setOpenModal(false);
  };
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        title="Title"
        onOk={props.handleOpen}
        onCancel={handleCancel}
        footer={false}
        width={800}
      >
        <TableComponents TableData={TableData} />
      </Modal>
    </React.Fragment>
  );
};

export default GraphModel;
