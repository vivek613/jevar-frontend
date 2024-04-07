import React, { useState } from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { API } from "../../Service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface AddCarrerProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const AddCarrer: React.FC<AddCarrerProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.mainAuth);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [validationError, setValidationError] = useState("");
  const handleApply = async () => {
    if (!name || !mobileNo || !email || !address || !experience || !image) {
      setValidationError("Please fill out all fields."); // Set validation error message
      return;
    }

    const db = {
      name: name,
      mobile_no: mobileNo,
      email: email,
      address: address,
      experience: experience,
      resume: imageSrc,
    };
    try {
      await API.addCarrer(userdata.user.token, db, dispatch);
      toast.success("Offer added successfully");
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const onImageChange = (event: any) => {
    setImage(event.target.files[0]);
    setImageSrc(URL.createObjectURL(event.target.files[0]));
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
            label="Name"
            size="lg"
            color="gray"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Mobile Number"
            size="lg"
            color="gray"
            required
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <Input
            label="Email"
            size="lg"
            color="gray"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Address"
            size="lg"
            color="gray"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            label="Experience"
            size="lg"
            color="gray"
            required
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <div className="mb-8">
            <p className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
              Resume
            </p>
            <input type="file" onChange={onImageChange} />
          </div>
          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}
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
