import React from "react";
import { Dialog } from "@material-tailwind/react";

interface ImagePreviewInterface {
  preview: string;
  open: boolean;
  handleOpen: () => void;
}

const ImagePreview: React.FC<ImagePreviewInterface> = ({
  preview,
  open,
  handleOpen,
}) => {

  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <img src={preview} alt="" className="w-34 h-34" />
    </Dialog>
  );
};

export default ImagePreview;
