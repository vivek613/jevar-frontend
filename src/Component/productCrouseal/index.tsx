import React from "react";
import Carousel from "react-multi-carousel";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://w7.pngwing.com/pngs/115/540/png-transparent-gold-chain-gold-chain-gold-chain-thumbnail.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
  {
    image:
      "https://i.pinimg.com/originals/7f/66/87/7f6687e6932eacef275b49d558a14cf3.png",
    name: "Paryah Gold Chain",
    price: "₹23,091",
    actual_price: "₹27,186",
    offer: "40% Off on Making on Gold jewellery",
  },
];

const ProductCrouseal = () => {
  const navigate = useNavigate();


  const CustomLeftArrow = (onClick: any) => {
    return (
      <button onClick={onClick} className="p-5 bg-black custom-left-arrow">
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    );
  };

  const onNavigate = () => {
    navigate(`/used-jewellry_details`);
  };

  return (
    <div className="py-5 mt-10">
      <Carousel
        customLeftArrow={<CustomLeftArrow />}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={10}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {data.map((item, index) => {
          return (
            <Card onClick={onNavigate} className="w-64 shadow-none border-2 cursor-pointer">
              <CardHeader
                color="blue-gray"
                className="relative bg-white shadow-none mt-[0.15rem]"
              >
                <img
                  src={item.image}
                  alt="img-blur-shadow"
                  className="object-contain w-64 h-64"
                />
              </CardHeader>
              <CardBody>
                <text className="text-xl font-roboto_black tracking-wide">
                  {item.name}
                </text>
                <div className="flex items-center mt-2">
                  <text className="text-lg font-roboto_bold text-primary tracking-wide">
                    {item.actual_price}
                  </text>
                  <text className="tetx-md line-through ml-2">
                    {item.price}
                  </text>
                </div>
                <text>{item.offer}</text>
              </CardBody>
            </Card>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductCrouseal;
