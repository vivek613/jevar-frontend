import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { API, Image_URL } from "../../../Service";
import { useDispatch, useSelector } from "react-redux";
import ImagePreview from "../../../Component/addProductForUser/imagePreview";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface CollectionInterface {}
const GoldCaratType = [
  { name: "10K", value: "price_gram_10k" },
  { name: "14K", value: "price_gram_14k" },
  { name: "16K", value: "price_gram_16k" },
  { name: "18K", value: "price_gram_18k" },
  { name: "20K", value: "price_gram_20k" },
  { name: "21K", value: "price_gram_21k" },
  { name: "22k", value: "price_gram_22k" },
  { name: "24K", value: "price_gram_24k" },
];
const Collection: React.FC<CollectionInterface> = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.mainAuth);
  const [open, setOpen] = useState(false);
  const [selectImage, setSelectImage] = React.useState<Array<any>>([]);
  const [imageData, setImageData] = useState<Array<any>>([]);
  const [preview, setPreview] = React.useState("");
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [data, setdata] = useState<Array<any>>([]);
  const [image, setImage] = React.useState<any>(null);
  const [category, setCategory] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const [goldCarat, setGoldCarat] = useState("");
  const [editData, setEditData] = useState<any>({});

  const handleOpen = () => setOpen(!open);

  const addCollection = async (body: any) => {
    await API.mainUser_addCollection(userdata.user.token, body, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          addCollectionImage(response.data.response);
        } else {
          toast.error("something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCollectionImage = async (data: any) => {
    const formData = new FormData();
    formData.append("id", data._id);
    for (const file of selectImage) {
      formData.append("collection_image", file);
    }
    await API.mainUser_addCollectionImage(
      userdata.user.token,
      formData,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response.data.message);
          getCollection();
          handleOpen();
          setImageData([]);
          setname("");
          setprice("");
        } else {
          toast.error("something went wrong! hello");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImageData([...imageData, URL.createObjectURL(img)]);
      setSelectImage([...selectImage, img]);
    }
  };

  useEffect(() => {
    getCollection();
    getCategory();
  }, []);

  const getCollection = async () => {
    await API.mainUser_getCollection(userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          const data = response?.data.response.filter(
            (item: any, index: any) => {
              return item.jeweller_id == userdata.user.user.id;
            }
          );
          setdata(data);
        } else {
          toast.error("something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCollection = async (id: any) => {
    await API.mainUser_deleteCollection(userdata.user.token, id, dispatch)
      .then((response) => {
        toast.success(response?.data.message);
        getCollection();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = async () => {
    await API.fetchCategory()
      .then((response) => {
        setCategory(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectCategory = (e: any) => {
    setCategoryID(e);
  };

  const selectGoldCarat = (e: any) => {
    setGoldCarat(e);
  };
  const removeCollectionImage = async (body: any) => {
    await API.mainUser_deleteCollectionImage(
      userdata.user.token,
      body,
      dispatch
    )
      .then((response) => {
        getCollection();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCollection = async (body: any) => {
    await API.mainUser_editCollection(userdata.user.token, body, dispatch)
      .then((response) => {
        toast.success(response?.data.message);
        getCollection();
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": "goldapi-kikarls066byh-io",
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full m-5">
      {data.length != 0 ? (
        <div className="flex items-center flex-wrap">
          <div
            onClick={() => {
              handleOpen();
              setEditData({});
              setname("");
              setprice("");
            }}
            className="w-44 h-[15rem] mr-2 border-2 border-black/30 border-dashed p-5 cursor-pointer rounded-xl flex flex-col justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10 mb-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="capitalize text-base tracking-wider font-roboto_medium">
              add collection
            </p>
          </div>
          {data.map((item, index) => {
            return (
              <div
                className="bg-primary/10 p-3 rounded-xl mx-2 mt-2 cursor-pointer relative"
                onClick={() => {}}
              >
                <img
                  src={`${
                    item.collection_image.length != 0 &&
                    item.collection_image[0].original
                  }`}
                  alt="img"
                  className="w-44 h-44 bg-contain rounded-xl m-auto outline-dotted outline-2"
                />
                <p className="text-lg font-roboto_regular capitalize ml-3 mt-3 w-44 line-clamp-1">
                  {item.collection_name}
                </p>
                <div className="flex items-center ml-3">
                  <p className="text-lg font-roboto_regular capitalize line-clamp-1">
                    Price :
                  </p>
                  <p className="text-lg font-roboto_regular capitalize ml-3 line-clamp-1">
                    {item.product_price}
                  </p>
                </div>

                <div className="flex items-center my-1">
                  <div
                    className="top-1 right-1 bg-white p-2 rounded-full mr-5"
                    onClick={() => {
                      handleOpen();
                      setEditData(item);
                      setname(item.collection_name);
                      setprice(item.product_price);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div
                    className="top-1 right-1 bg-white p-2 rounded-full"
                    onClick={() => {
                      deleteCollection(item._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-red-800"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-screen fixed flex items-center justify-center">
          <div
            onClick={() => {
              handleOpen();
              setEditData({});
              setname("");
              setprice("");
            }}
            className="py-12 px-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer -mt-24"
          >
            <p className="capitalize text-lg tracking-wider font-roboto_medium">
              add collection
            </p>
          </div>
        </div>
      )}
      {/* add collection modal */}
      <Dialog open={open} handler={handleOpen} className="py-3 px-4">
        <p className="text-center capitalize font-roboto_black text-primary text-lg">
          Add your Best Collection
        </p>
        <div className="border-b-2 border-b-secondry w-28 m-auto mt-2" />
        <div className="mt-5">
          <p className="capitalize font-roboto_medium tracking-wide text-lg mb-2">
            add image
          </p>
          <input
            onChange={handleImageChange}
            type="file"
            name="profile_image"
            accept="image/*"
          />
        </div>
        {Object.keys(editData).length != 0 && (
          <div className="flex items-center flex-wrap ml-5 mt-5">
            {imageData.map((item: string, index: number) => {
              return (
                <img
                  src={item}
                  alt=""
                  className="w-14 h-14 mr-3 mb-3 rounded-full cursor-pointer"
                  onClick={() => {
                    setPreview(item);
                    setTimeout(() => {
                      setIsPreviewOpen(open);
                    }, 200);
                  }}
                />
              );
            })}
          </div>
        )}
        {imageData.length != 0 && Object.keys(editData).length != 0 ? (
          <div
            onClick={() => {
              addCollectionImage(editData);
            }}
            className="w-24 flex items-center justify-center mb-2 border-[1px] rounded-xl border-primary capitalize cursor-pointer"
          >
            <text>upload</text>
          </div>
        ) : null}
        {Object.keys(editData).length != 0 && (
          <text className="ml-2 capitalize">alredy have image</text>
        )}
        <div className="flex items-center flex-wrap ml-5 mt-5 mb-2">
          {Object.keys(editData).length != 0 ? (
            <>
              {editData.collection_image.map((item: any, index: number) => {
                return (
                  <div className="relative">
                    <img
                      src={item.original}
                      alt=""
                      className="w-14 h-14 mr-3 mb-3 rounded-full cursor-pointer"
                      onClick={() => {
                        setPreview(item.original);
                        setTimeout(() => {
                          setIsPreviewOpen(open);
                        }, 200);
                      }}
                    />
                    <div
                      onClick={() => {
                        const datas = {
                          image: item.original,
                          id: editData._id,
                        };
                        removeCollectionImage(datas);
                      }}
                    >
                      <svg
                        fill="#FF0000"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute -top-1 -right-1"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>cancel</title>{" "}
                          <path d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.961 12.209c0.244-0.244 0.244-0.641 0-0.885l-1.328-1.327c-0.244-0.244-0.641-0.244-0.885 0l-3.761 3.761-3.761-3.761c-0.244-0.244-0.641-0.244-0.885 0l-1.328 1.327c-0.244 0.244-0.244 0.641 0 0.885l3.762 3.762-3.762 3.76c-0.244 0.244-0.244 0.641 0 0.885l1.328 1.328c0.244 0.244 0.641 0.244 0.885 0l3.761-3.762 3.761 3.762c0.244 0.244 0.641 0.244 0.885 0l1.328-1.328c0.244-0.244 0.244-0.641 0-0.885l-3.762-3.76 3.762-3.762z"></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {imageData.map((item: string, index: number) => {
                return (
                  <img
                    src={item}
                    alt=""
                    className="w-14 h-14 mr-3 mb-3 rounded-full cursor-pointer"
                    onClick={() => {
                      setPreview(item);
                      setTimeout(() => {
                        setIsPreviewOpen(open);
                      }, 200);
                    }}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="">
          <Select
            variant="outlined"
            label="Select collection type"
            color="gray"
            disabled={Object.keys(editData).length != 0 ? true : false}
            onChange={selectCategory}
            value={editData.category_id}
          >
            {category.map((item: any, index) => {
              return (
                <Option key={index} value={item.id} className="capitalize">
                  {item.category_name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="">
          <Select
            variant="outlined"
            label="Select Gold Carat"
            color="gray"
            onChange={selectGoldCarat}
            value={goldCarat}
          >
            {GoldCaratType.map((item: any, index) => {
              return (
                <Option key={index} value={item.value} className="capitalize">
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-5 mb-5 w-full">
            <Input
              variant="outlined"
              label="product Name"
              color="gray"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="mt-5 mb-5 w-full ml-5">
            <Input
              variant="outlined"
              label="product price"
              color="gray"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
        </div>
        <div className=" flex items-center justify-center pt-5">
          <Button
            className="bg-primary"
            onClick={() => {
              if (Object.keys(editData).length != 0) {
                const data = {
                  id: editData._id,
                  collection_name: name,
                  product_price: price,
                };
                editCollection(data);
                setEditData({});
              } else {
                if (selectImage.length != 0 && name) {
                  const data = {
                    collection_name: name,
                    category_id: categoryID,
                    product_price: price,
                    jeweller_id: userdata.user.user.id,
                    jeweller_name: userdata.user.user.name,
                    jeweller_address: userdata.user.user.address,
                    city: userdata.user.user.city,
                    state: userdata.user.user.state,
                    is_show: true,
                  };
                  addCollection(data);
                } else {
                  toast.error("All field are required!");
                }
              }
            }}
          >
            {Object.keys(editData).length != 0
              ? "Edit collection"
              : " Add collection"}
          </Button>
        </div>
        <ImagePreview
          preview={preview}
          open={isPreviewOpen}
          handleOpen={() => setIsPreviewOpen(!isPreviewOpen)}
        />
        <ToastContainer />
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Collection;
