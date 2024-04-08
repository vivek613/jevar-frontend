import React from "react";

interface PersonProfileProps {
  name: string;
  occupation: string;
  imageSrc: string;
}

const PersonProfileCard: React.FC<PersonProfileProps> = ({ name, occupation, imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 rounded-lg p-4 shadow-md">
      <img src={imageSrc} alt={name} className="w-24 h-24 rounded-full mb-4" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{occupation}</p>
      </div>
    </div>
  );
};

export default PersonProfileCard;