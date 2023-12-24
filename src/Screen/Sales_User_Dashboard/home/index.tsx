import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import GraphModel from "../model/graphModel";
import PaymentGraphModel from "../model/paymentGraphModel";
import { monthData } from "../../../utils/Utils";
import { Button, Card, Col, Row } from "antd";
import CardDefault from "../../../Component/Card/Card";

const SalesHome = () => {
  const userdata = useSelector((state: any) => state.salesAuth);
  const d = new Date();

  const dispatch = useDispatch();
  const [monthIncome, setMonthIncome] = useState<any>({});
  const [associatedUser, setAssociatedUser] = useState<any>([]);
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [jewellerPaymentCount, setJewellerPaymentCount] = useState<any>();
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalForPayment, setOpenModalForPayment] = React.useState(false);
  const [graphData, setGraphData] = useState();

  const handleOpen = () => {
    setOpenModal((cur) => !cur);
  };
  const handleOpenForPayment = () => {
    setOpenModalForPayment((cur) => !cur);
    setGraphData(jewellerPaymentCount);
  };
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

  return (
    <div className="bg-[#f0f2f5]  p-3">
      <Row gutter={[24, 24]}>
        <CardDefault
          title={`${monthData[d.getMonth()]} Income`}
          showButton={true}
          value={monthIncome?.currentMonthTotalPayAmount || 0}
          handleOpen={() => {
            handleOpen();
            setGraphData(monthIncome?.totalPayAmount);
          }}
        />

        <CardDefault
          title={"Payment Status"}
          showButton={false}
          value={paymentDetails?.currentMonthFalsePayments?.totalPayAmount}
        />

        <CardDefault
          showButton={true}
          title={"Number of Jewellers Associated with you"}
          value={associatedUser?.length}
          handleOpen={() => {
            handleOpen();
            setGraphData(associatedUser);
          }}
        />

        <Col span={8}>
          <Card
            title={"Payment Status of Jewellers associated with you"}
            bordered={true}
            className="min-h-[180px] mt-3"
          >
            <span className="font-bold text-lg">{`${jewellerPaymentCount?.jewellerPaymentDone?.length} jewellers paid ${jewellerPaymentCount?.jewellerPaymentNotDone?.length} remaining
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
      <div>
        <h3></h3>
      </div>
      {openModal && (
        <GraphModel
          open={openModal}
          setOpenModal={setOpenModal}
          handleOpen={() => handleOpen()}
          data={graphData}
        />
      )}
      {openModalForPayment && (
        <PaymentGraphModel
          open={openModalForPayment}
          handleOpen={() => handleOpenForPayment()}
          data={graphData}
        />
      )}
    </div>
  );
};

export default SalesHome;
