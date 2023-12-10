import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CardDefault from "../components/Card";

const SalesHome = () => {
  const userdata = useSelector((state: any) => state.salesAuth);
  const dispatch = useDispatch();
  const [monthIncome, setMonthIncome] = useState<any>();
  const [associatedUser, setAssociatedUser] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const getProductPayment = async () => {
    await API.User_fetchMonthIncome(userdata.user.token, dispatch)
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
    await API.User_fetchPaymentDue(userdata.user.token, dispatch)
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
  useEffect(() => {
    getProductPayment();
    getCustomer();
    getPaymentDue();
  }, []);

  console.log("mont", monthIncome);
  console.log("paye", paymentDetails);
  console.log("jewe", associatedUser);

  return (
    <>
      <div className="flex justify-evenly">
        <div>
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Month Income
          </text>
          <CardDefault
            title={"November Income"}
            value={monthIncome?.totalPayAmount}
          />
        </div>

        <div>
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Payement Status
          </text>
          <CardDefault
            title={"Payment Status"}
            value={paymentDetails?.currentMonthFalsePayments?.totalPayAmount}
          />
        </div>
        <div>
          <text className="font-roboto_medium mt-2 mb-4 text-[0.900rem] sm:text-base text-blue uppercase ml-5 lg:ml-0">
            Number Of jewellers
          </text>
          <CardDefault
            title={"Number of Jewellers Associated with you"}
            value={associatedUser?.length}
          />
        </div>
      </div>
    </>
  );
};

export default SalesHome;
