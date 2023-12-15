import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CardDefault from "../components/Card";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const SalesHome = () => {
  const userdata = useSelector((state: any) => state.salesAuth);
  const dispatch = useDispatch();
  const [monthIncome, setMonthIncome] = useState<any>();
  const [associatedUser, setAssociatedUser] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [jewellerPaymentCount, setJewellerPaymentCount] = useState<any>();

  const getProductPayment = async () => {
    await API.User_fetchMonthIncome(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        console.log("respo", response);
        setMonthIncome(response?.data?.data);
        // setProductPay(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPaymentDue = async () => {
    await API.User_fetchPaymentDue(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        console.log("paymentDue", response);
        setPaymentDetails(response?.data?.data);
        // setProductPay(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("user", userdata);
  const getCustomer = async () => {
    await API.salesUser_associated_jeweller(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          setAssociatedUser(response?.data?.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getJewellerPayment = async () => {
    await API.salesUser_jeweller_payment(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          setJewellerPaymentCount(response?.data?.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductPayment();
    getCustomer();
    getPaymentDue();
    getJewellerPayment();
  }, []);

  console.log("mont", monthIncome);
  console.log("paye", paymentDetails);
  console.log("jewe", associatedUser);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 ml-4 mt-4">
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Month Income
          </text>
          <CardDefault
            title={"November Income"}
            value={monthIncome?.totalPayAmount}
          />
        </div>

        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Payement Status
          </text>
          <CardDefault
            title={"Payment Status"}
            value={paymentDetails?.currentMonthFalsePayments?.totalPayAmount}
          />
        </div>
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Number Of jewellers
          </text>
          <CardDefault
            title={"Number of Jewellers Associated with you"}
            value={associatedUser?.length}
          />
        </div>

        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            jeweller payment status
          </text>
          <Card className="mt-6 w-96">
            <CardBody className="flex  justify-center flex-col">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Payment Status of Jewellers associated with you
              </Typography>
              <div className="text-lg font-bold">{`${jewellerPaymentCount?.jewellerPaymentDone?.length} jewellers paid ${jewellerPaymentCount?.jewellerPaymentNotDone?.length} remaining
`}</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SalesHome;
