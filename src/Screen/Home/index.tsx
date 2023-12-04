import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import background from "../../Assets/bg.jpeg";
import about from "../../Assets/home/about.jpg";
import Footer from "../../Component/footer";
import SingleDetails from "../../Component/singleDetails";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { setLoader } from "../../Stores/actions/loader";
import Collection from "../../Component/collections";
import { API } from "../../Service";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Stores/actions/auth";

interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state: any) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [product, setProduct] = useState({});
  const [otp, setotp] = useState("");
  const [mobile, setMobile] = useState("");
  const [huid, setHuid] = useState("");
  const handleOpen = () => setOpen(!open);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const [collection, setcollection] = useState<Array<any>>([]);
  const [category, setCategory] = useState([]);
  const [profileData, setProfileData] = useState();

  console.log(userdata);

  const findProduct = async () => {
    const data = {
      huid: huid,
      mobile: mobile,
    };
    await API.findProduct(data, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          toast.success(response.data.message);
          setSuccess(true);
        } else {
          setErr(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOTP = async () => {
    const data = {
      otp: otp,
      huid: huid,
    };
    await API.findProduct_verify_otp(data, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          handleOpen();
          setProduct(response.data.response);
          getUser(response.data.response.user_id);
          clear();
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollection();
    getCategory();
  }, []);

  const getCollection = async () => {
    await API.mainUser_getCollectionComman(dispatch)
      .then((response) => {
        setcollection(response?.data.response);
        console.log(
          "======================response?.data.response=============="
        );
        console.log(response?.data.response);
        console.log("====================================");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   fetchCollection();
  // }, []);

  // const fetchCollection = async () => {
  //   const apis = `/api/v1/mainUser/collection/getallcollection`;
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json", // Specify the content type
  //     },
  //   };
  //   fetch(apis, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       alert("successfully!");
  //     })
  //     .catch((error) => {
  //       alert("error");
  //     });
  // };

  const getCategory = async () => {
    await API.fetchCategory()
      .then((response) => {
        setCategory(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clear = () => {
    setHuid("");
    setMobile("");
    setotp("");
    setSuccess(false);
  };

  const getUser = async (id: any) => {
    await API.normalUser_profileWithoutToken(id, dispatch)
      .then((response) => {
        if (response?.status == 200) {
          setProfileData(response?.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <article
        className="min-w-screen h-[24rem] lg:h-[38rem] 2xl:h-[48rem] 3xl:h-[47rem] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="min-w-screen h-[24rem] lg:h-[38rem] 2xl:h-[48rem] 3xl:h-[47rem] bg-black/50 flex items-center md:justify-end justify-center -mt-10 lg:-mt-0 px-10">
          <div>
            <p className="md:w-[48rem] text-xl md:text-3xl md:tracking-wider md:leading-relaxed font-roboto_medium text-white">
              Welcome to Jevar Bazaar, the ultimate destination for all your
              jewelry needs. We are a one-stop solution, offering a wide range
              of exquisite jewelry options including real gold jewelry, used
              gold jewelry, imitation jewelry, silver and platinum jewelry.
            </p>
            <Button
              onClick={() => {
                navigate("/about");
              }}
              className="bg-transparent border-[1px] shadow-none capitalize tracking-wider font-roboto_medium mt-2"
            >
              read more
            </Button>
          </div>
        </div>
      </article>
      {/* collections */}
      {category.length != 0 && (
        <div className="my-10">
          <p className="text-center text-3xl capitalize font-roboto_medium tracking-wide text-primary">
            latest collections
          </p>
          <div className="flex items-center justify-center">
            <div className="w-24 border-t-2 border-primary/50" />
            <FaStar className="mx-1 text-light_gold font-roboto_bold" />
            <div className="w-24 border-t-2 border-primary/50" />
          </div>
        </div>
      )}
      {category.length != 0 && <Collection data={category} />}
      <div className="my-10">
        <p className="text-center text-3xl capitalize font-roboto_medium tracking-wide text-primary">
          find lost jewelry
        </p>
        <div className="flex items-center justify-center">
          <div className="w-24 border-t-2 border-primary/50" />
          <FaStar className="mx-1 text-light_gold font-roboto_bold" />
          <div className="w-24 border-t-2 border-primary/50" />
        </div>
      </div>
      <div className="md:flex items-center justify-evenly py-10">
        <div className="lg:w-[40rem] mb-6 md:mb-0">
          <p className="font-roboto_medium text-xl text-gray-800 tracking-wide leading-relaxed text-center md:text-left">
            Have you found the lost or stolen jewellery? Then find the owner by
            entering the unique code behind the jewellery
          </p>
        </div>
        <Card className="shadow-2xl shadow-primary md:p-10 p-5 mx-3 md:mx-0">
          <text className="text-center mb-5 tracking-wide capitalize font-bold text-primary text-lg">
            Find Your Jewellary
          </text>
          <div className="md:w-96 mb-5">
            <Input
              label="HUID"
              color="gray"
              value={huid}
              onChange={(e) => {
                setHuid(e.target.value);
                setErr(false);
              }}
            />
            {err && (
              <p className="text-sm font-roboto_medium mt-2 ml-2 text-red-600">
                Invalid HUID number
              </p>
            )}
          </div>
          <div className="md:w-96 mb-6">
            <Input
              label="Mobile Number"
              color="gray"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </div>
          {success && (
            <div className="md:w-96 mb-6">
              <Input
                label="OTP"
                color="gray"
                value={otp}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
              />
            </div>
          )}
          <Button
            variant="gradient"
            className="bg-primary"
            onClick={() => {
              if (success) {
                verifyOTP();
              } else {
                findProduct();
              }
            }}
          >
            {success ? "Submit" : "GET OTP"}
          </Button>
        </Card>
      </div>
      <Footer />
      <SingleDetails
        open={open}
        handleOpen={handleOpen}
        data={product}
        profile={profileData}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
