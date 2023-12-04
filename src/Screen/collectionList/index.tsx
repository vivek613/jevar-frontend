import React, { useEffect, useState } from "react";
import { API, Image_URL } from "../../Service";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

const CollectionList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [collection, setCollection] = useState([]);

  useEffect(() => {
    fecthCollection();
  }, []);

  const fecthCollection = async () => {
    API.mainUser_getCollectionComman(dispatch)
      .then((response) => {
        const id = queryParams.get("id");
        const filterData = response?.data.response.filter(
          (item: any, index: any) => {
            return item.category_id == id;
          }
        );
        setCollection(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {collection.length != 0 ? (
        <div className="flex items-center flex-wrap m-5">
          {collection.map((item: any, index) => {
            return (
              <div key={index} className="border-2 p-5 mr-5 cursor-pointer">
                <img
                  src={`${item.collection_image[0].original}`}
                  alt="img"
                  className="w-[9.5rem] h-[9.5rem] object-cover rounded-xl mb-2"
                />
                <text className="px-2 w-[9.5rem] line-clamp-1 font-roboto_medium capitalize text-blue-gray-900">
                  {item.collection_name}
                </text>
                <div className="flex items-center px-2 my-2">
                  <text className="block font-roboto_regular text-black capitalize">
                    price :
                  </text>
                  <text className="block font-roboto_medium text-black ml-2">
                    ₹{item.product_price}
                  </text>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-screen h-screen fixed flex items-center justify-center -mt-16">
          <text className="text-xl font-roboto_medium text-blue-gray-700">
            Data not found
          </text>
        </div>
      )}
    </div>
  );
};

export default CollectionList;
