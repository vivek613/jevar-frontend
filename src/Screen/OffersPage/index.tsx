

import React from "react";


const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: "Special Discount",
      description: "Get 20% off on all jewelry!",
      imageSrc:'https://images.unsplash.com/photo-1591209663228-48ea1a3556cf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      title: "Spring Sale",
      description: "Limited-time offer: Buy 1, Get 1 Free!",
      imageSrc:'https://images.unsplash.com/photo-1584377334016-464803e03b80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      title: "Summer Special",
      description: "Enjoy the sun with our summer deals!",
      imageSrc: 'https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 4,
      title: "Back to School Sale",
      description: "Gear up for the new school year with our amazing deals!",
      imageSrc: 'https://images.unsplash.com/photo-1631050165155-421c47e306f7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      title: "Fall Fashion Sale",
      description: "Update your wardrobe for the fall season!",
      imageSrc: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];

  return (
<div className="container mx-auto py-8">
  <div className="mt-5 my-10 mb-10">
    {offers.map((offer, index) => (
      <div
        key={index}
        className="bg-white rounded-lg p-10 shadow-md mx-auto w-full h-64 my-10 mb-8"
        style={{ backgroundImage: `url(${offer.imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
        <p className="text-gray-600">{offer.description}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default OffersPage;
