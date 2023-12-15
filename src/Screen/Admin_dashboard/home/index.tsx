import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CardDefault from "../components/Card";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const AdminHome = () => {
  const userdata = useSelector((state: any) => state.adminAuth);
  const dispatch = useDispatch();
  const [totalJeweller, setTotalJeweller] = useState<any>();
  const [totalSalesUser, setTotalSalesUser] = useState<any>();
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [jewellerPaymentCount, setJewellerPaymentCount] = useState<any>();
  console.log("user", userdata);
  const getAllUser = async () => {
    await API.get_All_user(userdata.user.token, dispatch)
      .then((response) => {
        console.log("respo", response);
        // setMonthIncome(response?.data?.data);
        // setProductPay(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPayment = async () => {
    await API.get_All_user_payment(userdata.user.token, dispatch)
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
  const getSalesUser = async () => {
    await API.get_All_sales_user(userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          console.log("res", response);

          setTotalSalesUser(response?.data?.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getJewellerUser = async () => {
    await API.get_All_jeweller_user(userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          setTotalJeweller(response?.data?.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUser();
    getSalesUser();
    getAllPayment();
    getJewellerUser();
  }, []);

  console.log("paye", paymentDetails);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Month Income
          </text>
          <CardDefault
            title={"Total Number Of Jewellers Onboard"}
            value={totalJeweller?.totalUser}
          />
        </div>

        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Payement Status
          </text>
          <CardDefault
            title={"Total Number of Sales Person Onboard"}
            value={totalSalesUser?.totalUser}
          />
        </div>
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Number Of jewellers
          </text>
          <CardDefault
            title={"Number of Jewellers Associated with you"}
            value={totalSalesUser?.totalUser}
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

export default AdminHome;
