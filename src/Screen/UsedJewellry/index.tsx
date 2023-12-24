import { Dialog, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Footer from "../../Component/footer";
import { useNavigate } from "react-router-dom";
import { API } from "../../Service";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";

interface UsedJewellrInterface {}

const UsedJewellry: React.FC<UsedJewellrInterface> = () => {
  const dispatch = useDispatch();
  const [type, setType] = React.useState("true");
  const [colors, setColors] = React.useState("");
  const [priceStart, setPriceStart] = React.useState("");
  const [priceEnd, setPriceEnd] = React.useState("");
  const [conditions, setConditions] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState<Array<any>>([]);

  const handleOpen = () => setOpen(!open);

  const _selectType = (e: any) => {
    setType(e);
  };

  useEffect(() => {
    getProductForSell();
  }, [type]);

  const getProductForSell = async () => {
    await API.normalUser_checkProduct_Allget(dispatch)
      .then((response) => {
        const typeConvert = type == "true" ? true : false;
        const data = response?.data.data.filter((item: any, index: number) => {
          return item.is_premium_product == typeConvert;
        });
        setdata(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LeftSideBar = () => {
    return (
      <>
        <div className="w-72 h-auto bg-primary/10 rounded-lg m-6 p-6 ">
          {/* head */}
          <div className="flex items-center justify-between">
            <text className="tracking-wider capitalize font-roboto_medium text-primary text-lg">
              filters
            </text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
          {/* apply filters */}
          {/* <SelectedFilter /> */}
          {/* body */}
          <div className="my-8">
            <text className="text-base font-roboto_medium text-blue">
              Premium Products
            </text>
            <div className="mt-3">
              <Select
                variant="standard"
                label="Type"
                color="brown"
                value={type}
                onChange={_selectType}
                defaultValue={"true"}
              >
                <Option value="true" defaultChecked={true}>
                  Premium
                </Option>
                <Option value="false">local</Option>
              </Select>
            </div>
          </div>
          {/* price filter */}
        </div>
      </>
    );
  };

  const MobileFilter = (props: any) => {
    return (
      <div className="lg:hidden">
        <div className="flex items-center justify-between mx-5 mt-5">
          <text className="tracking-wider capitalize font-roboto_medium text-primary text-lg">
            filters
          </text>
          <svg
            onClick={() => setShow(!show)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <Dialog
          open={show}
          handler={() => setShow(!show)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          size="xl"
          className="flex items-center justify-center"
        >
          <LeftSideBar />
        </Dialog>
      </div>
    );
  };

  const RightSideBar = (props: any) => {
    const navigate = useNavigate();
    const { handleOpen, data: any } = props;

    const onNavigate = (queryParams: any) => {
      navigate(`/used-jewellry_details?${queryParams}`);
    };

    return (
      <div
        // onClick={() => {onNavigate()}}
        className="flex flex-wrap justify-center lg:justify-start 2xl:w-full h-[87vh] lg:h-[41rem] 2xl:h-[85vh] scrollbar overflow-scroll lg:mt-6 my-5"
      >
        {data.length != 0 ? (
          <>
            {data.map((item, index) => {
              const queryParams = new URLSearchParams(item).toString();
              return (
                <div
                  onClick={() => {
                    handleOpen(item);
                    onNavigate(queryParams);
                  }}
                  className="mx-2 mb-3 flex flex-col items-center border-2 p-2 relative rounded-xl cursor-pointer max-h-72 w-48"
                >
                  {item.is_premium_product && (
                    <FaStar className="mx-1 text-light_gold font-roboto_bold absolute right-3 top-3 text-xl" />
                  )}
                  <img
                    src={
                      "https://5.imimg.com/data5/BN/FC/MD/ANDROID-20950968/product-jpeg.jpg"
                    }
                    alt=""
                    className="w-16 h-16 md:w-36 md:h-36 lg:w-40 lg:h-40 2xl:w-44 2xl:h-44 rounded-xl"
                  />
                  <div className="w-24 md:w-32 mt-1 lg:mt-2 grid place-items-center">
                    <p className="lg:text-[1.05rem] leading-6 md:text-md text-xs font-roboto_medium text-center line-clamp-1 w-36">
                      {item.product_name}
                    </p>
                    <div className="mt-2">
                      <text className="lg:text-lg md:text-md text-xs font-roboto_medium text-center text-primary">
                        ₹{item.price}
                      </text>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex items-center justify-center w-screen">
            <text className="font-roboto_regular text-lg">
              data not available
            </text>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <MobileFilter />
      <div className="flex">
        <div className="lg:block hidden">
          <LeftSideBar />
        </div>
        <RightSideBar data={data} handleOpen={handleOpen} />
      </div>
    </div>
  );
};

export default UsedJewellry;
