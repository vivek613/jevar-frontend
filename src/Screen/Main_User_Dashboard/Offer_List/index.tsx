import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import OfferModal from "../../../Component/offerModel";

const Head = ["title", "description", "image", "Action"];

export function Offer_List() {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [offerDetails, setOfferDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [offerDetails, setOfferDetails] = useState<{ title: string; description: string; imageSrc: string; } | undefined>(undefined);
  
  const [offerDetails, setOfferDetails] = useState<{ _id: string; title: string; description: string; imageSrc: string; } | undefined>(undefined);
  useEffect(() => {

    getCategory();
  }, []);
console.log("off",offerDetails);
  const handleDelete = async (id: string) => {
    try {
      await API.deleteOffer(id);
      getCategory();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const updateOffer = async (id: string, title: string, description: string, imageSrc: string) => {
    try {
      const response = await API.fetchOfferById(id);
      console.log("response.data",response.data);
      setOfferDetails(response.data.data); // Set offer details from API response
      setIsEditMode(true); // Set edit mode
      setShowModal(true); // Open modal
    } catch (error) {
      console.error("Error fetching offer details:", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await API.fetchOffer();
      setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleAddOffer = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    getCategory();
    setShowModal(false);
    // setOfferDetails(null); // Reset offer details
    setIsEditMode(false); // Reset edit mode
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false); // Set edit mode to false
    setShowModal(true); // Open modal
  };

  return (
    <Card className="h-full w-full">
      <OfferModal
        open={showModal}
        handleOpen={() => setShowModal(true)}
        handleClose={handleClose}
        offerDetails={offerDetails}
        isEditMode={isEditMode}
      />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                // icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              className="flex items-center gap-2 bg-primary/80"
              size="sm"
              onClick={handleOpenAddModal}
            >
              <PlusIcon strokeWidth={1} className="h-4 w-4" /> Add Offer
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {Head.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offers.map(({ title, description, imageSrc, _id }, index) => {
              const isLast = index === offers.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={title}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {imageSrc}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text" onClick={() => updateOffer(_id, title, description, imageSrc)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete User">
                      <IconButton variant="text" onClick={() => handleDelete(_id)}>
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default Offer_List;
