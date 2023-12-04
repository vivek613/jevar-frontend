import React, { useEffect, useState } from "react";
import "./style.css";
import { Select, Option, Input, Dialog } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/footer";
import { API, Image_URL } from "../../Service";
import { useDispatch } from "react-redux";

interface CollectionInterface {}

const Collection: React.FC<CollectionInterface> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [search, setsearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [collection, setCollection] = useState<any>([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    await API.fetchCategory()
      .then((response) => {
        setCategory(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function replaceDuplicatesWith(array: any, replacementValue: any) {
    const encounteredValues: any = {};

    for (let i = 0; i < array.length; i++) {
      const currentValue = array[i];
      if (encounteredValues[currentValue]) {
        array[i] = replacementValue;
      } else {
        encounteredValues[currentValue] = true;
      }
    }

    return array;
  }

  const fecthCollection = async (items: any) => {
    API.mainUser_getCollectionComman(dispatch)
      .then((response) => {
        const filterData = response?.data.response.filter(
          (item: any, index: any) => {
            return item.category_id == items.id;
          }
        );
        setCollection(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchCity = (search: any) => {
    const results = collection.filter((obj: any) => {
      const objValue = obj.city.toLowerCase();
      const lowerSearchString = search.toLowerCase();
      return objValue.includes(lowerSearchString);
    });
    setSearchResult(results);
  };

  return (
    <div className="w-full h-auto">
      <div className="flex items-center flex-wrap mt-5 mx-5">
        {category.map((item: any, index) => {
          let arrImg: any = null;
          if (Array.isArray(item.category_image)) {
            arrImg = item.category_image[0];
          } else {
            arrImg = item.category_image;
          }
          return (
            <div
              className="mr-3 cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => {
                setOpen(true);
                setData(item);

                fecthCollection(item);
              }}
            >
              <img src={arrImg.data} alt="" className="w-64 h-64 rounded-2xl" />
              <p className="m-3">{item.category_name}</p>
            </div>
          );
        })}
      </div>
      <Dialog
        size="xxl"
        open={open}
        handler={() => setOpen(!open)}
        className="bg-white shadow-none"
      >
        <div className="flex items-center justify-between mx-6 my-3">
          <p className="text-lg font-roboto_bold capitalize">
            {data.category_name}
          </p>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setOpen(false);
              setsearch("");
            }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="#0F0F0F"
              ></path>{" "}
            </g>
          </svg>
        </div>
        {collection.length != 0 && (
          <div className="w-96 pt-5 px-5">
            <Input
              label="Search city"
              color="black"
              className="font-roboto_medium text-blue-gray-700 text-lg"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
                searchCity(e.target.value);
              }}
            />
          </div>
        )}

        {search ? (
          searchResult.length != 0 ? (
            <div className="flex items-center flex-wrap m-5">
              {searchResult.map((item: any, index) => {
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
            <div className="w-screen h-[50vh] fixed flex items-center justify-center ">
              {/* <text className="text-xl font-roboto_medium text-blue-gray-700">
                Data not found
              </text> */}
            </div>
          )
        ) : (
          <>
            {collection.length != 0 ? (
              <div className="flex items-center flex-wrap m-5">
                {collection.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="border-2 p-5 mr-5 cursor-pointer"
                    >
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
              <div className="w-screen h-[50vh] fixed flex items-center justify-center ">
                {/* <text className="text-xl font-roboto_medium text-blue-gray-700">
              Data not found
            </text> */}
              </div>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Collection;
