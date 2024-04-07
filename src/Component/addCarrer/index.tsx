import React, { useState } from "react";
import { Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";

interface AddCarrerProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const AddCarrer: React.FC<AddCarrerProps> = ({ open, handleOpen, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleApply = () => {
    // Logic for applying the changes
    handleClose();
  };

  const handleCancel = () => {
    // Logic for canceling the changes
    handleClose();
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center bg-primary"
        >
          <Typography variant="h3" color="white" className="font-roboto_bold">
            Add Career
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Title"
            size="lg"
            color="gray"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            size="lg"
            color="gray"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Image Source"
            size="lg"
            color="gray"
            required
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            onClick={handleApply}
            fullWidth
            className="bg-secondry"
          >
            Apply
          </Button>
          <Button
            variant="text"
            onClick={handleCancel}
            fullWidth
            className="mt-4 text-blue-gray-500"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default AddCarrer;
