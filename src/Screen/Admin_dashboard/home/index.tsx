import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CardDefault from "../components/Card";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import GraphModel from "../model/graphModel";
import PaymentGraphModel from "../model/paymentGraphModel";
import { monthData } from "../../../utils/Utils";

const AdminHome = () => {
  const userdata = useSelector((state: any) => state.adminAuth);
  const d = new Date();

  const dispatch = useDispatch();
  const [totalJeweller, setTotalJeweller] = useState<any>();
  const [totalSalesUser, setTotalSalesUser] = useState<any>();
  const [totalAllUser, setTotalAllUser] = useState<any>();
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalForPayment, setOpenModalForPayment] = React.useState(false);

  const [graphData, setGraphData] = useState();
  const handleOpen = () => {
    setOpenModal((cur) => !cur);
  };
  const handleOpenForPayment = () => {
    setOpenModalForPayment((cur) => !cur);
    setGraphData(paymentDetails);
  };

  const getAllUser = async () => {
    await API.get_All_user(userdata.user.token, dispatch)
      .then((response) => {
        console.log("alluser", response);

        if (response?.status == 200) {
          setTotalAllUser(response?.data?.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPayment = async () => {
    await API.get_All_user_payment(userdata.user.token, dispatch)
      .then((response) => {
        setPaymentDetails(response?.data?.data);
        // setProductPay(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSalesUser = async () => {
    await API.get_All_sales_user(userdata.user.token, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          setTotalSalesUser(response?.data);
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
          console.log("respo", response);
          setTotalJeweller(response?.data);
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

  console.log("payemntDetails", paymentDetails);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 ml-5 mt-5">
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Total Number Of Jewellers
          </text>
          <CardDefault
            title={"Total Number Of Jewellers Onboard"}
            showButton={true}
            value={totalJeweller?.TotalCount}
            handleOpen={() => {
              handleOpen();
              setGraphData(totalJeweller?.monthWise);
            }}
          />
        </div>

        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Total Number of Sales
          </text>
          <CardDefault
            title={"Total Number of Sales Person Onboard"}
            value={totalSalesUser?.TotalCount}
            showButton={true}
            handleOpen={() => {
              handleOpen();
              setGraphData(totalSalesUser?.monthWise);
            }}
          />
        </div>
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            {monthData[d.getMonth()]} register
          </text>
          <CardDefault
            title={`Number of ${monthData[d.getMonth()]} register`}
            showButton={false}
            value={totalAllUser?.monthDataCount}
          />
        </div>
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            today register
          </text>
          <CardDefault
            title={"Number of  today register"}
            showButton={false}
            value={totalAllUser?.todayData?.length}
          />
        </div>
        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Number Of Total Register
          </text>
          <CardDefault
            title={"Annual Registration"}
            showButton={false}
            value={totalAllUser?.annualTotalCount}
          />
        </div>

        <div className="col-span-2">
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            jeweller payment status
          </text>
          <Card className="mt-6 w-96">
            <CardBody className="flex  justify-center flex-col">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {monthData[d.getMonth()]} Month Payment Status
              </Typography>
              <div className="text-lg font-bold">{`${paymentDetails?.jewellerPaymentDone?.length} jewellers paid ${paymentDetails?.jewellerPaymentNotDone?.length} remaining
`}</div>
              <Button
                variant="filled"
                color="blue-gray"
                size="sm"
                fullWidth
                // className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
                className="flex items-center justify-center w-36  mt-3"
                onClick={handleOpenForPayment}
              >
                View Details
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      {openModal && (
        <GraphModel
          open={openModal}
          handleOpen={() => handleOpen()}
          data={graphData}
        />
      )}
      {openModalForPayment && paymentDetails && (
        <PaymentGraphModel
          open={openModalForPayment}
          handleOpen={() => handleOpenForPayment()}
          data={graphData}
        />
      )}
    </>
  );
};

export default AdminHome;
