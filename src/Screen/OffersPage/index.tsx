import React, { useEffect, useState } from "react";
import { API } from "../../Service";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getAllOffers();
  }, []);

  const getAllOffers = async () => {
    try {
      const response = await API.fetchOffer();
      setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mt-5 my-10 mb-10">
        {offers.length > 0 &&
          offers.map((item:any, index:any) => (
            <div
              key={index}
              className="bg-white rounded-lg p-10 shadow-md mx-auto w-full h-64 my-10 mb-8"
              style={{
                backgroundImage: `url(${item.imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OffersPage;