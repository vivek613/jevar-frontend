import React, { useState, useEffect } from "react";
import { Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import { API } from "../../Service";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import UploadFileComponents from "../Upload/UploadFile";

interface OfferModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  offerDetails?: {
    title: string;
    description: string;
    imageSrc: string;
_id:string;
  };
  isEditMode: boolean;
}

const OfferModal: React.FC<OfferModalProps> = ({ open, handleOpen, handleClose, offerDetails }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (offerDetails) {
      setTitle(offerDetails.title);
      setDescription(offerDetails.description);
      setImageSrc(offerDetails.imageSrc);
    }
  }, [offerDetails]);

  const handleApply = async () => {
    // Validate input fields
    if (!title || !description) {
      toast.error("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // Append image data to formData if it exists
    }

    try {
      if (offerDetails) {
      
        await API.editOffer(offerDetails._id, formData);
        toast.success("Offer updated successfully");
      } else {

        await API.addOffers(formData, dispatch);
        toast.success("Offer added successfully");
      }
      setTitle("");
      setDescription("");
      setImage(null); // Reset image state
      setImageSrc("");
      handleClose();
    } catch (error) {
      toast.error("Failed to update offer");
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Logic for canceling the changes
    setTitle("");
    setDescription("");
    setImage(null);
    setImageSrc("");
    handleClose();
  };

  const onImageChange = (event: any) => {
    // Update image state when an image is uploaded
    setImage(event.target.files[0]); // Assuming single file upload, update accordingly if multiple files are allowed
    setImageSrc(URL.createObjectURL(event.target.files[0])); // Set image preview URL
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
            {offerDetails ? "Edit Offer" : "Add Offer"}
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
          <div className="mb-8">
            <p className="font-roboto_medium text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
              Image
            </p>
            <input type="file" onChange={onImageChange} /> {/* Input for image upload */}
          </div>
          {imageSrc && (
            <img src={imageSrc} alt="Uploaded" className="mx-auto max-w-[200px] mb-4" />
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            onClick={handleApply}
            fullWidth
            className="bg-secondry"
          >
            {offerDetails ? "Update" : "Apply"}
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

export default OfferModal;
