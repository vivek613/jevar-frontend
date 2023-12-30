import {
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../Service";

import { useLocation } from "react-router-dom";

import { Space, Table } from "antd";
import ProductModel from "../../../Component/addProductForUser/editProductModel";
import { toast } from "react-toastify";
import DeleteModel from "../../../Component/DeleteModel/DeleteModel";

const UserDetails = () => {
  const userdata = useSelector((state: any) => state.mainAuth);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<any>({});
  const [openForDelete, setOpenForDelete] = useState<boolean>(false);

  const [product, setProduct] = React.useState([]);
  const [showProductView, setShowProductView] = React.useState(false);
  const [viewData, setViewData] = React.useState<any>({});

  const [open, setOpen] = React.useState(false);
  const getProductImage = async (itemData: any) => {
    setShowProductView(true);
    setViewData(itemData);
    // setimages()
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getProduct();
  }, [showProductView]);
  const columns = [
    {
      title: "HUID",
      dataIndex: "huid",
      key: "huid",
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Buying Date",
      dataIndex: "buying_date",
      key: "buying_date",
    },
    {
      title: "Jeweller",
      dataIndex: "jewellers_name",
      key: "jewellers_name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },

    {
      title: "Bill",
      key: "bill",
      render: (record: any) => (
        <Space size="middle">
          {/* Add any action buttons or links here */}
          <a
            href={`${process.env.REACT_APP_BASE_URL}/${record.bill_image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Bill
          </a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button variant="outlined" onClick={() => getProductImage(record)}>
            Edit
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              setViewData(record);
              setOpenForDelete(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleProductDelete = async () => {
    await API.mainUser_productDelete(
      viewData.product_id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        toast.success(response?.data.message);
        getProduct();
        setOpenForDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = async () => {
    const id = queryParams.get("id");
    await API.mainUser_getProduct(id, userdata.user.token, dispatch)
      .then((response) => {
        setProduct(response?.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async () => {
    const id = queryParams.get("id");
    await API.normalUser_profile(id, userdata.user.token, dispatch)
      .then((response) => {
        setUser(response?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-auto lg:p-10">
      <div className="lg:flex">
        <div className="hidden lg:block">
          {user.profile_image != undefined ? (
            <Avatar
              src={`${user.profile_image.data}`}
              alt="avatar"
              variant="rounded"
              withBorder={true}
              color="amber"
              className="p-1 w-64 h-64 cursor-pointer"
            />
          ) : (
            <div className="w-64 h-64 border-2 rounded-lg flex items-center justify-center">
              <text className="text-6xl uppercase font-roboto_black">
                {user?.name?.charAt(0)}
              </text>
            </div>
          )}
        </div>

        <div className="lg:flex w-full bg-white lg:ml-12 border-2 rounded-lg p-5">
          <div>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide">
              Name
            </p>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("name")}
            </p>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Email-Id
            </p>
            <div className="flex items-center">
              <p className="ml-3 font-roboto_black text-xl text-gray-800 tracking-wide">
                {queryParams.get("email")}
              </p>
            </div>
            <p className="font-roboto_black text-lg text-gray-600 tracking-wide mt-3">
              Phone Number
            </p>
            <p className="ml-3 font-roboto_black text-xl text-gray-800 capitalize tracking-wide">
              {queryParams.get("mobile")}
            </p>
          </div>
        </div>
      </div>
      {/* jewellary details */}
      <p className="mt-7 mb-2 text-xl font-roboto_bold text-primary tracking-wide text-center">
        Product Details
      </p>
      <div className="border-b-2 border-secondry w-48 grid m-auto mb-6" />
      <Table
        dataSource={product}
        columns={columns}
        rowKey="_id"
        pagination={false} // If you want to disable pagination
      />
      {/* pagination */}

      <ProductModel
        open={showProductView}
        handel={() => setShowProductView(!showProductView)}
        data={viewData}
        sellMode={false}
      />
      {/* edit profile picture */}
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>Edit your profile picture.</DialogHeader>
        <DialogBody divider>
          <input
            // onChange={handleImageChange}
            type="file"
            name="profile_image"
            accept="image/*"
            className=""
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              // handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <DeleteModel
        open={openForDelete}
        setOpen={setOpenForDelete}
        handleConfirm={handleProductDelete}
      />
    </div>
  );
};

export default UserDetails;
