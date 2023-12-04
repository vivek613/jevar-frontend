import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { API } from "../../Service";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import AddProductFromUser from "../../Component/addProductForUser";

interface ServiceInterface {}

const Service: React.FC<ServiceInterface> = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.auth);
  const [paymentData, setPaymentData] = useState({});
  const [isAddProduct, setIsAddProduct] = useState(false);

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const createOrder = async (data: any) => {
    API.normalUser_service_order(userdata.user.token, data, dispatch)
      .then((response) => {
        const { amount, order_id, currency } = response?.data;
        const options = {
          key: "rzp_test_DYKqsQu85R0fGZ",
          amount: amount.toString(),
          currency: currency,
          name: "Jevar-Bazaar",
          description: "You buying the service on your gold jewellry.",
          image: {},
          order_id: order_id,
          handler: async (response: any) => {
            const data = {
              user_id: userdata.user.user.id,
              order_creation_id: order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              payment_dt: moment(),
            };
            setPaymentData(data);
            API.normalUser_add_payment_info(userdata.user.token, data, dispatch)
              .then((response) => {
                toast.success(response?.data.message);
                setTimeout(() => {
                  setIsAddProduct(true);
                }, 500);
              })
              .catch((err) => {
                toast.error(err.response);
              });
          },
          prefill: {
            name: userdata.user.user.name,
            email: userdata.user.user.email,
            contact: userdata.user.user.mobile,
          },
          notes: {
            address: userdata.user.user.address,
          },
          theme: {
            color: "#AA530E",
          },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      })
      .catch((err) => {
        console.log(err);
        toast.error("please login to get access");
      });
  };

  return (
    <div className="w-full h-auto bg-white">
      <p className="text-center my-8 uppercase tracking-wider font-roboto_regular text-primary/60 text-xl">
        features
      </p>
      <p className="text-center capitalize text-3xl tracking-wide text-primary font-roboto_bold">
        our features & services.
      </p>
      <div className="flex flex-col items-center justify-between my-12">
        <Card
          variant="gradient"
          className="w-full max-w-[20rem] p-8 bg-secondry"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              standard
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-4xl">₹</span>320{" "}
              {/* <span className="self-end text-4xl">/year</span> */}
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
                </span>
                <Typography className="font-roboto_regular text-white">
                  lost and found
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
                </span>
                <Typography className="font-roboto_regular text-white">
                  100+ city includes
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
                </span>
                <Typography className="font-roboto_regular text-white">
                  Re-sell special mark
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
                </span>
                <Typography className="font-roboto_regular text-white">
                  free updates
                </Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
                </span>
                <Typography className="font-roboto_regular text-white">
                  full support
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            <Button
              size="lg"
              className="text-blue-500 hover:scale-[1.10] focus:scale-[1.02] active:scale-100 bg-primary text-white font-roboto_regular"
              ripple={false}
              fullWidth={true}
              onClick={() => {
                const data = {
                  amount: 320 * 100,
                };
                createOrder(data);
              }}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer />
      <AddProductFromUser
        open={isAddProduct}
        handel={() => setIsAddProduct(!isAddProduct)}
        paymentData={paymentData}
      />
    </div>
  );
};

export default Service;
