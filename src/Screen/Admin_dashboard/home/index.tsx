import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import GraphModel from "../model/graphModel";
import PaymentGraphModel from "../model/paymentGraphModel";
import { monthData } from "../../../utils/Utils";
import { Button, Card, Col, Row } from "antd";
import CardDefault from "../../../Component/Card/Card";

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
      <div className="bg-[#f0f2f5]  p-3">
        <Row gutter={[24, 24]}>
          <CardDefault
            title={"Total Number Of Jewellers Onboard"}
            showButton={true}
            value={totalJeweller?.TotalCount}
            handleOpen={() => {
              handleOpen();
              setGraphData(totalJeweller?.TotalData);
            }}
          />

          <CardDefault
            title={"Total Number of Sales Person Onboard"}
            value={totalSalesUser?.TotalCount}
            showButton={true}
            handleOpen={() => {
              handleOpen();
              setGraphData(totalSalesUser?.TotalData);
            }}
          />

          <CardDefault
            title={`Number of ${monthData[d.getMonth()]} register`}
            showButton={false}
            value={totalAllUser?.monthDataCount}
          />

          <CardDefault
            title={"Number of  today register"}
            showButton={false}
            value={totalAllUser?.todayData?.length}
          />

          <CardDefault
            title={"Annual Registration"}
            showButton={false}
            value={totalAllUser?.annualTotalCount}
          />

          <Col span={8}>
            <Card
              title={`${monthData[d.getMonth()]} Month Payment Status`}
              bordered={true}
              className="min-h-[180px] mt-3"
            >
              <span className="font-bold text-lg">{`${paymentDetails?.jewellerPaymentDone?.length} jewellers paid ${paymentDetails?.jewellerPaymentNotDone?.length} remaining
`}</span>

              <Button
                className="flex items-center mt-3"
                onClick={handleOpenForPayment}
              >
                View Details
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      {openModal && (
        <GraphModel
          open={openModal}
          setOpenModal={setOpenModal}
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
