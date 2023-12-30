import {
  Card,
  CardBody,
  Carousel,
  Collapse,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import ProductCrouseal from "../../Component/productCrouseal";
import Footer from "../../Component/footer";
import { BsWhatsapp } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { API } from "../../Service";
import { useDispatch } from "react-redux";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const UsedJewellryDetails = (props: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const [sOpen, setSopen] = useState(false);
  const toggleSopen = () => setSopen((cur) => !cur);
  const [data, setData] = useState<any>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    getProductForSell();
  }, []);

  const getProductForSell = async () => {
    await API.normalUser_checkProduct_Allget(dispatch)
      .then((response) => {
        const id = queryParams.get("product_id");
        const data = response?.data.data.filter((item: any, index: any) => {
          return item.product_id == id;
        });
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("sss", data);
  return (
    <div>
      <div className="w-full h-auto lg:px-16 lg:py-10">
        <div className="lg:flex">
          <div className="hidden lg:block w-[38rem]">
            {/* <ImageGallery
              items={data[0].product_image}
              showFullscreenButton={true}
              infinite
              showPlayButton={false}
              showNav={false}
              slideDuration={1000}
              thumbnailPosition="left"
            /> */}
          </div>
          <div className="flex items-center justify-center">
            <div className="lg:hidden w-[25rem]">
              {/* <ImageGallery
                items={data[0].product_image}
                showFullscreenButton={true}
                infinite
                showPlayButton={false}
                showNav={false}
                slideDuration={1000}
                thumbnailPosition="bottom"
              /> */}
            </div>
          </div>
          <div className="mx-5 lg:mx-0 lg:ml-12 mt-5 lg:mt-0">
            <text className="block text-xl text-black font-roboto_medium tracking-wide capitalize">
              {queryParams.get("product_type")}
            </text>
            <div className="flex items-center mt-2">
              <text className="block text-base text-primary font-roboto_black tracking-wide">
                HUID No: {queryParams.get("huid")}
              </text>
              {/* <text className="block ml-3 underline text-blue-gray-700 hover:text-blue cursor-pointer font-roboto_medium">
                View Details
              </text> */}
            </div>
            {/* border */}
            <div className="border-b-[0.5px] my-5 lg:w-[48rem] border-b-blue-gray-100" />
            {/* price section */}
            <div className="flex items-center">
              <div>
                <text className="font-roboto_regular text-center block">
                  price
                </text>
                <text className="block text-xl text-primary font-roboto_bold tracking-wide text-center">
                  ₹{queryParams.get("total_price")}
                </text>
              </div>
              {/* <div className="ml-8">
                <text className="font-roboto_regular text-center block">
                  making charges
                </text>
                <text className="block ml-3 text-xl font-roboto_regular text-blue-gray-600 text-center">
                  ₹{queryParams.get("making_charges")}
                </text>
              </div> */}
            </div>
            {/* border */}
            <div className="border-b-[0.5px] my-5 lg:w-[48rem] border-b-blue-gray-100" />
            {/* specificatrion just two */}
            <div className="flex">
              <div>
                <text className="block text-base font-roboto_regular text-gray-900">
                  Product Size
                </text>
                <text className="block text-center mt-1 font-roboto_medium text-primary text-lg">
                  15 CM
                </text>
              </div>
              <div className="ml-10">
                <text className="block text-base font-roboto_regular text-gray-900">
                  How old this Product?
                </text>
                <text className="block text-center mt-1 font-roboto_medium text-primary text-lg">
                  2 year
                </text>
              </div>
            </div>
            {/* other product */}
          </div>
        </div>

        <div>
          <text className="block text-center mt-16 text-2xl lg:text-3xl font-roboto_medium text-gray-700 tracking-wider">
            Product Information
          </text>
          <div className="flex items-center justify-center mt-3 ">
            <div className="border-b-2 w-36 border-b-secondry" />
          </div>
        </div>
        <div className="lg:flex justify-center mt-10">
          <div>
            {/* <div className="w-96 p-5 bg-blue-gray-100/30 rounded-lg">
              <p>Product Summary</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <text className="block mb-2">Style No.</text>
                  <text className="block mb-2">Metal Weight</text>
                  <text className="block">Gross Weight</text>
                </div>
                <div>
                  <text className="block text-right mb-2">VRGBS12</text>
                  <text className="block text-right mb-2">9.53g</text>
                  <text className="block text-right">9.53g</text>
                </div>
              </div>
            </div> */}
            <div className="w-96 p-5 bg-blue-gray-100/30 rounded-lg mt-5">
              <p className="text-center text-base font-roboto_bold tracking-wide">
                contact this jewellary owner
              </p>
              <p className="text-center mt-1 font-roboto_regular text-sm">
                buy this product for you own risk
              </p>
              <div className="flex items-center justify-between mt-5">
                <div className="flex flex-col items-center">
                  <button className="bg-blue-gray-100 hover:bg-primary/80 hover:text-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 font-roboto_medium text-sm">
                    {queryParams.get("user_phone")}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <button className="bg-blue-gray-100 p-2 rounded-full hover:bg-primary/80 hover:text-white">
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
                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 font-roboto_medium text-sm">
                    {queryParams.get("user_email")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="lg:ml-16 mt-5 lg:mt-0">
            <div
              onClick={toggleOpen}
              className="flex items-center justify-between lg:w-[48rem] bg-blue-gray-100/30 p-3 cursor-pointer"
            >
              <p className="uppercase text-sm font-roboto_bold text-gray-800 tracking-wide">
                price breakup
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`w-6 h-6 text-gray-800 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <Collapse open={open} className="bg-blue-gray-100/30">
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">metal</p>
                <p>₹53,949</p>
              </div>
              <div className="border-b-[0.5px] border-b-black/20 mx-4" />
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">making charges</p>
                <p>₹14,533</p>
              </div>
              <div className="border-b-[0.5px] border-b-black/20 mx-4" />
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">{"GST(3%)"}</p>
                <p>₹2,054</p>
              </div>
              <div className="border-b-[0.5px] border-b-black/20 mx-4" />
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">grand total</p>
                <p>₹70,536</p>
              </div>
            </Collapse>
            <div
              onClick={toggleSopen}
              className="flex items-center justify-between lg:w-[48rem] bg-blue-gray-100/30 p-3 rounded-lg mt-4 cursor-pointer"
            >
              <p className="uppercase text-sm font-roboto_bold text-gray-800 tracking-wide">
                metel details
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`w-6 h-6 text-gray-800 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <Collapse open={sOpen} className="bg-blue-gray-100/30">
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">metal name</p>
                <p>Yellow Gold</p>
              </div>
              <div className="border-b-[0.5px] border-b-black/20 mx-4" />
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">purity</p>
                <p>22K</p>
              </div>
              <div className="border-b-[0.5px] border-b-black/20 mx-4" />
              <div className="flex items-center justify-between mx-4 my-4 capitalize font-roboto_regular">
                <p className="text-blue-gray-700">metal weight</p>
                <p>9.53g</p>
              </div>
            </Collapse>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsedJewellryDetails;
