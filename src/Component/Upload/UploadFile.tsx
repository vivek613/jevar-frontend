import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface UploadInterface {
  handleUpload: (file: object) => void;
  listType?: any;
}
const UploadFileComponents: React.FC<UploadInterface> = ({
  handleUpload,
  listType,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      console.log("file", file);
      handleUpload(file);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload listType={listType} {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </>
  );
};

export default UploadFileComponents;
