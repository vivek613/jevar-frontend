import React, { useEffect, useState } from "react";
import { API } from "../../../Service";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import moment from "moment";

const SellProduct = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.auth);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getSellProduct();
  }, []);

  const getSellProduct = async () => {
    await API.normalUser_checkProduct_get(userdata.user.token, dispatch)
      .then((response) => {
        const data = response?.data.data.filter((item: any, index: any) => {
          return item.user_id == userdata.user.user.id;
        });
        setdata(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeSellProduct = async (body: any) => {
    await API.normalUser_checkProduct_delete(
      userdata.user.token,
      body,
      dispatch
    )
      .then((response) => {
        if (response?.status == 200) {
          alert(response?.data.message);
          getSellProduct();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="w-full h-full bg-white">
      {data.length != 0 ? (
        <>
          <div className="my-10">
            <p className="text-center text-3xl capitalize font-roboto_medium tracking-wide text-primary">
              Re-sell Product
            </p>
            <div className="flex items-center justify-center">
              <div className="w-24 border-t-2 border-primary/50" />
              <FaStar className="mx-1 text-light_gold font-roboto_bold" />
              <div className="w-24 border-t-2 border-primary/50" />
            </div>
          </div>
          <p className="text-center mb-8 text-red-500 font-roboto_medium">
            Note :{" "}
            <text className="font-roboto_regular text-gray-700">
              Product discription's border color gold this product buy premium
              service for this website and other are simple gray border color.
            </text>
          </p>
          <div className="flex items-center flex-wrap mx-5">
            {data.map((item: any, index: any) => {
              return (
                <div
                  className={`border-2 p-5 mr-5 w-[30rem] rounded-lg shadow-md ${
                    item.is_premium_product
                      ? "border-yellow-700"
                      : "border-gray-600"
                  }`}
                >
                  {/* <FaStar className="mx-1 text-light_gold font-roboto_bold text-3xl" /> */}
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">
                      product name
                    </text>
                    <text className="text-lg font-roboto_regular">
                      {item.product_name}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">
                      product price
                    </text>
                    <text className="text-lg font-roboto_regular">
                      ₹{item.price}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">
                      making charges
                    </text>
                    <text className="text-lg font-roboto_regular">
                      ₹{item.making_charges}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">
                      buy date
                    </text>
                    <text className="text-lg font-roboto_regular">
                      {moment(item.product_buying_date).format("YYYY-MM-DD")}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">
                      discription
                    </text>
                    <text className="text-lg font-roboto_regular">
                      {item.discription}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">phone</text>
                    <text className="text-lg font-roboto_regular">
                      {item.user_phone}
                    </text>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <text className="text-lg font-roboto_medium ">email</text>
                    <text className="text-lg font-roboto_regular">
                      {item.user_email}
                    </text>
                  </div>

                  <p
                    onClick={() => {
                      const data = {
                        product_id: item.product_id,
                        id: item._id,
                      };
                      removeSellProduct(data);
                    }}
                    className="bg-red-500 text-center py-2 mx-12 mt-10 text-white font-roboto_medium capitalize cursor-pointer"
                  >
                    remove product
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-screen h-screen fixed flex items-center justify-center -mt-16">
          <text className="text-xl font-roboto_medium">
            product not available
          </text>
        </div>
      )}
    </div>
  );
};

export default SellProduct;
