import { Button, Modal } from "antd";
import React from "react";
interface DeleteInterface {
  open: boolean;
  setOpen: any;
  handleConfirm: () => void;
}
const DeleteModel: React.FC<DeleteInterface> = ({
  open,
  setOpen,
  handleConfirm,
}) => {
  const handleOk = () => {
    handleConfirm();
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      title="Delete"
      //   onOk={handleOk}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button className="bg-red-500 text-white" onClick={handleOk}>
            Delete
          </Button>
        </>
      )}
    >
      <span className="font-bold text-lg">
        Are you sure ,Do You Want to Delete
      </span>
    </Modal>
  );
};

export default DeleteModel;
