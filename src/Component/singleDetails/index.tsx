import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
} from "@material-tailwind/react";
import { API, Image_URL } from "../../Service";

const SingleDetails = (props: any) => {
  const { data, profile } = props;
  return (
    <Dialog
      size="lg"
      open={props.open}
      handler={props.handleOpen}
      className="p-5 lg:p-8 overflow-scroll lg:overflow-visible"
    >
      <p className="text-center lg:mb-8 lg:text-2xl uppercase font-roboto_medium tracking-wider">
        owner's profile
      </p>
      {data.is_private == "public" ? (
        <div className="lg:flex justify-center">
          {profile && (
            <div>
              {profile && (
                <>
                  {profile.profile_image != undefined ? (
                    <Avatar
                      src={`${profile.profile_image.data}`}
                      alt="avatar"
                      variant="rounded"
                      withBorder={true}
                      color="amber"
                      className="p-1 w-36 h-36 cursor-pointer"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center border-2 overflow-hidden rounded-full">
                      <text className="text-5xl font-roboto_black ">
                        {profile.name.charAt(0)}
                      </text>
                    </div>
                  )}
                </>
              )}
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  owner name :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.name}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  owner mobile :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.mobile}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  owner email :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.email}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  product name :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {data.product_name}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  product HUID :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {data.huid}
                </text>
              </div>
            </div>
          )}
          <div className="border-l-2 mx-10" />
          {profile && (
            <div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  address :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.address}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  city :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.city}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  state :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {profile.state}
                </text>
              </div>
              <div className="border-t-2 my-3" />
              <p className="text-center mb-5 font-roboto_medium">
                Lost Or Stolen
              </p>
              <div>
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  jewellery Lost or stolen :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {data.is_lost_or_stolen}
                </text>
              </div>
              <div className="mt-5">
                <text className="text-lg font-roboto_regular text-gray-600 capitalize">
                  If yes Report of the lost jewellery :
                </text>
                <text className="text-lg ml-2 font-roboto_medium text-gray-700 capitalize">
                  {data.is_report == true ? "Yes" : "No"}
                </text>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="m-auto mt-10">
          <text className="block text-center text-xl font-roboto_regular">
            Sorry for this...
          </text>
          <text className="block text-center text-lg font-roboto_medium">
            Data are private mode.
          </text>
        </div>
      )}
    </Dialog>
  );
};

export default SingleDetails;
