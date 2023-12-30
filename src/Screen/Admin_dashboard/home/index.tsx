import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import GraphModel from "../model/graphModel";
import PaymentGraphModel from "../model/paymentGraphModel";
import { monthData } from "../../../utils/Utils";
import { Button, Card, Col, Row, Space, Switch } from "antd";
import CardDefault from "../../../Component/Card/Card";
import TableUser from "../Table/TableUser";
import EditModel from "../model/paymentGraphModel";

const AdminHome = () => {
  const userdata = useSelector((state: any) => state.adminAuth);
  const d = new Date();
  console.log("vivek", userdata);
  const dispatch = useDispatch();
  const [totalJeweller, setTotalJeweller] = useState<any>();
  const [totalSalesUser, setTotalSalesUser] = useState<any>();
  const [totalAllUser, setTotalAllUser] = useState<any>();
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);

  const [graphData, setGraphData] = useState();
  const handleOpen = () => {
    setOpenModal((cur) => !cur);
  };
  const handleOpenForPayment = () => {
    setOpenModalForEdit(false);
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
  const handleEdit = (data: any) => {
    setOpenModalForEdit(true);
    setGraphData(data);
  };
  const handleSubmit = async (values: any) => {
    console.log("values", values);

    await API.salesUser_edit(values.id, userdata.user.token, values, dispatch)
      .then((response) => {
        // getUser();
        console.log("respose", response);
        toast.success(response?.data?.message);
        setOpenModalForEdit(false);
        getSalesUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Remaining Amount",
      dataIndex: "remaining_amount",
      key: "remaining_amount",
    },
    {
      title: "Is Verified Account",
      dataIndex: "is_verify_account",
      key: "is_verify_account",
      render: (isVerified: boolean, record: object) => (
        <Switch
          checked={isVerified}
          className="bg-blue-gray-500"
          onChange={(e) => {
            const checked = e;
            handleSwitchChange(checked, record);
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="middle">
          {record.adhar_card_image && (
            <Button
              onClick={() =>
                handleDownload(record.adhar_card_image, "Aadhar Card")
              }
            >
              Download Aadhar
            </Button>
          )}
          {record.pancard_image && (
            <Button
              onClick={() => handleDownload(record.pancard_image, "PAN Card")}
            >
              Download PAN
            </Button>
          )}
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        </Space>
      ),
    },
  ];
  const columnsForJewellery = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "Total Amount",
      dataIndex: "totalPayment",
      key: "totalPayment",
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
      key: "productCount",
    },
    {
      title: "Disable",
      dataIndex: "delete",
      key: "disable",
      render: (idDelete: boolean, record: object) => (
        <Switch
          checked={idDelete}
          className="bg-blue-gray-500"
          onChange={(e) => {
            const checked = e;
            handleSwitchChangeForJeweller(checked, record);
          }}
        />
      ),
    },
  ];

  const handleSwitchChange = async (checked: boolean, record: any) => {
    // Handle switch change logic, e.g., update the "is_verify_account" field in your data.

    const checkData = {
      check: checked,
    };
    await API.salesUser_approve(
      record.id,
      userdata.user.token,
      checkData,

      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response.data.message);

          getSalesUser();
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSwitchChangeForJeweller = async (
    checked: boolean,
    record: any
  ) => {
    // Handle switch change logic, e.g., update the "is_verify_account" field in your data.

    const checkData = {
      delete: checked,
    };
    await API.mainUser_disable(
      record.id,
      userdata.user.token,
      checkData,

      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          getJewellerUser();
          toast.success(response.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDownload = (imageUrl: any, cardType: any) => {
    // Implement download logic, e.g., open a new window or trigger a download.
    const link = document.createElement("a");
    link.href = process.env.REACT_APP_BASE_URL + imageUrl;
    link.target = "_blank";
    link.download = `${cardType}_Image`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <span className="font-bold text-lg">{`${paymentDetails?.result?.length} jewellers paid ${paymentDetails?.jewellerPaymentNotDone} remaining
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

        <div className="mt-3">
          <h2 className="font-bold text-lg">Sales Register</h2>
          <TableUser TableData={totalSalesUser?.TotalData} columns={columns} />
        </div>
        <div className="mt-3">
          <h2 className="font-bold text-lg">Jewellery Register</h2>
          <TableUser
            TableData={totalJeweller?.TotalData}
            columns={columnsForJewellery}
          />
        </div>
      </div>
      {openModal && (
        <GraphModel
          open={openModal}
          setOpenModal={setOpenModal}
          handleOpen={() => handleOpen()}
          data={graphData}
        />
      )}
      {openModalForEdit && paymentDetails && (
        <EditModel
          open={openModalForEdit}
          handleOpen={() => handleOpenForPayment()}
          handleSubmit={handleSubmit}
          data={graphData}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default AdminHome;
