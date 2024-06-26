import { Avatar, Button, Radio } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API, Image_URL } from "../../../Service";
import { toast } from "react-toastify";
import ProfileEdit from "../Model/ProfileEdit";

const heading = ["profile", "mobile", "email", ""];
interface HomeHomeDashInterface {}

const HomeDash: React.FC<HomeHomeDashInterface> = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.mainAuth);
  const [customer, setCustomer] = useState<Array<any>>([]);
  const [product, setProduct] = React.useState([]);
  const [profileImage, setProfileImage] = useState<any>(null);

  const [openModalForEditJeweller, setOpenModalForEditJeweller] =
    React.useState(false);
  const [userAmount, setUserAmount] = useState({
    lastMonth: 0,
    currentMonth: 0,
  });
  const [searchText, setSearchText] = useState("");
  const handleOpenForJeweller = () => {
    setOpenModalForEditJeweller(false);
  };
  const handleSearch = (value: any) => {
    setSearchText(value);
  };
  const filteredCustomerData = customer.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.mobile.includes(searchText)
  );
  const handleSubmitForJeweller = async (values: any) => {
    const updateData = {
      profile_image: profileImage,
      name: values.name,
    };
    await API.mainUser_Edit(
      userdata.user.user.id,
      userdata.user.token,
      updateData,
      dispatch
    )
      .then((response) => {
        getCustomer();
        handleOpenForJeweller();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCustomer();
  }, []);

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

  const getCustomer = async () => {
    await API.mainUser_customerList(
      userdata.user.user.id,
      userdata.user.token,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          console.log("repsoe", response);
          setCustomer(response.data.response);
          setProduct(response.data?.ProductCount);
          setUserAmount({
            lastMonth: response.data?.lastMonthAmount,
            currentMonth: response.data?.totalAmount,
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductImage = async (data: any) => {
    await API.Common_add_Image(data, dispatch)
      .then((response) => {
        setProfileImage(response?.data?.data?.thumbnail);

        toast.success(response?.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectBill = (event: any) => {
    if (event) {
      const img = event;

      const data = new FormData();
      data && data.append("image", img);

      addProductImage(data);
    }
  };
  console.log("user", userdata);

  const payNow = (data: any, type: boolean) => {
    API.mainUser_service_order(userdata.user.token, data, dispatch)
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
            const Payment = {
              totalPayment: type ? 0 : userAmount.currentMonth,
              last_month_payment: type ? userAmount.lastMonth : 0,
            };

            await API.mainUser_Edit(
              userdata.user.user.id,
              userdata.user.token,
              Payment,
              dispatch
            )
              .then((response) => {
                // alert(response?.data.message);
                getCustomer();
              })
              .catch((err) => {
                console.log(err);
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

  let convert = (n: any) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  return (
    <div className="w-full h-auto">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setOpenModalForEditJeweller(true);
          }}
          className="bg-primary text-base px-8 py-1 mt-3 "
        >
          Edit Profile
        </Button>
      </div>
      <div className="flex items-center justify-center bg-primary/30 py-6 mt-3 mx-5 rounded-full shadow-sm">
        <p className="lg:text-2xl tracking-wider font-roboto_medium text-primary">
          {userdata.user.user.name}
        </p>
      </div>

      <div className="lg:flex mb-5 sm:mx-10">
        {customer.length != 0 ? (
          <div className="w-full">
            <div className="flex flex-col md:flex-row mx-5 md:mx-0 mt-6">
              <div className="border-2 h-64 flex flex-col items-center justify-center w-full mr-5">
                <div className="p-6 bg-primary/20 shadow-lg rounded-full">
                  <FaUser className="text-2xl text-primary" />
                </div>
                <p className="mt-3 uppercase tracking-wider font-roboto_regular text-primary">
                  user
                </p>
                <p className="tracking-wider text-2xl font-roboto_black text-primary">
                  {convert(customer.length)}
                </p>
              </div>
              <div className="border-2 h-64 flex flex-col items-center justify-center w-full mr-5">
                <div className="p-6 bg-primary/20 shadow-lg rounded-full">
                  {/* <FaUser className="text-2xl text-primary" /> */}
                  <svg
                    fill="#AA530E"
                    width="25.5px"
                    height="25.5px"
                    viewBox="0 0 52 52"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m45.2 19.6a1.6 1.6 0 0 1 1.59 1.45v22.55a4.82 4.82 0 0 1 -4.59 4.8h-32.2a4.82 4.82 0 0 1 -4.8-4.59v-22.61a1.6 1.6 0 0 1 1.45-1.59h38.55zm-12.39 6.67-.11.08-9.16 9.93-4.15-4a1.2 1.2 0 0 0 -1.61-.08l-.1.08-1.68 1.52a1 1 0 0 0 -.09 1.44l.09.1 5.86 5.55a2.47 2.47 0 0 0 1.71.71 2.27 2.27 0 0 0 1.71-.71l4.9-5.16.39-.41.52-.55 5-5.3a1.25 1.25 0 0 0 .11-1.47l-.07-.09-1.72-1.54a1.19 1.19 0 0 0 -1.6-.1zm12.39-22.67a4.81 4.81 0 0 1 4.8 4.8v4.8a1.6 1.6 0 0 1 -1.6 1.6h-44.8a1.6 1.6 0 0 1 -1.6-1.6v-4.8a4.81 4.81 0 0 1 4.8-4.8z" />
                  </svg>
                </div>
                <p className="mt-3 uppercase tracking-wider font-roboto_regular text-primary">
                  product
                </p>
                <p className="tracking-wider text-2xl font-roboto_black text-primary">
                  {convert(product.length)}
                </p>
              </div>
              <div className="border-2 h-64 flex flex-col items-center justify-center w-full mr-5">
                <div className="p-6 bg-primary/20 shadow-lg rounded-full">
                  {/* <FaUser className="text-2xl text-primary" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-primary"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.8 14.988A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-3 uppercase tracking-wider font-roboto_regular text-primary">
                  pay bill
                </p>
                <Button
                  onClick={() => {
                    if (userAmount.currentMonth != 0) {
                      const data = {
                        amount: userAmount.currentMonth,
                      };

                      payNow(data, true);
                    } else {
                      alert("you have not payable amount.");
                    }
                  }}
                  className="bg-primary text-lg px-8 py-1 mt-3 font-roboto_medium"
                >
                  ₹ {convert(userAmount.currentMonth)}
                </Button>
              </div>
              {userAmount.lastMonth > 0 && (
                <div className="border-2 h-64 flex flex-col items-center justify-center w-full mr-5">
                  <div className="p-6 bg-primary/20 shadow-lg rounded-full">
                    {/* <FaUser className="text-2xl text-primary" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-primary"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.8 14.988A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 uppercase tracking-wider font-roboto_regular text-primary">
                    last month bill
                  </p>
                  <Button
                    onClick={() => {
                      if (userAmount.lastMonth != 0) {
                        const data = {
                          amount: userAmount.lastMonth,
                        };

                        payNow(data, false);
                      } else {
                        alert("you have not payable amount.");
                      }
                    }}
                    className="bg-primary text-lg px-8 py-1 mt-3 font-roboto_medium"
                  >
                    ₹ {convert(userAmount.lastMonth)}
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-5">
              <p className="capitalize text-2xl font-roboto_medium text-primary tracking-wide">
                golden client
              </p>
              <div className="mb-2 w-[40%]">
                <Input
                  placeholder="Search by name or mobile number"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="relative overflow-x-auto border-2 sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      {heading.map((item, index) => {
                        return (
                          <th scope="col" className="px-6 py-3">
                            {item}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomerData.map((item: any, index: number) => {
                      const queryParams = new URLSearchParams(item).toString();
                      return (
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                          >
                            {item.profile_image != undefined ? (
                              <Avatar
                                size="md"
                                alt="avatar"
                                src={`${item.profile_image.data}`}
                                className="ring-4 ring-green-500/30 border border-green-500 shadow-xl shadow-green-900/20 object-contain"
                              />
                            ) : (
                              <div className="outline-double outline-2 outline-primary w-10 h-10 flex items-center justify-center rounded-full">
                                <text className="text-xl font-roboto_black">
                                  {item.name.charAt(0)}
                                </text>
                              </div>
                            )}
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {item.name}
                              </div>
                            </div>
                          </th>
                          <td className="px-6 py-4">{item.mobile}</td>
                          <td className="px-6 py-4">{item.email}</td>

                          <td className="px-5">
                            <button
                              onClick={() => {
                                // navigate(`/user-profile?${queryParams}`);
                              }}
                              className="text-blue font-roboto_medium"
                            >
                              <Link to={`/user-details?${queryParams}`}>
                                More
                              </Link>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen fixed -mt-24 flex items-center justify-center">
            <text className="text-lg font-roboto_regular">
              data not available
            </text>
          </div>
        )}
      </div>
      {openModalForEditJeweller && (
        <ProfileEdit
          open={openModalForEditJeweller}
          handleOpen={() => handleOpenForJeweller()}
          handleSubmit={handleSubmitForJeweller}
          data={userdata}
          selectBill={selectBill}
        />
      )}
    </div>
  );
};

export default HomeDash;
