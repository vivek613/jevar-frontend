import React,{useState} from "react";
import { carrerList } from "../../utils/Utils";
import {useNavigate } from "react-router-dom";
import AddCarrer from "../../Component/addCarrer";
const Career = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); 
  console.log("Apply button clicked!",carrerList);
    const handleOpenModal = () => {
        // navigate("/add-career");
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false); 
      };
  return (
    <div>
      <AddCarrer
        open={isModalOpen} 
        handleOpen={handleOpenModal} 
        handleClose={handleCloseModal}
      />
      {carrerList.map((item) => (
    <div className="bg-white-300 rounded-lg shadow-md overflow-hidden mx-10 my-10 border-l-4 border-primary/80 relative">
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{item.role}</h2>
      <button  onClick={handleOpenModal} className="absolute  bg-primary/80 bottom-4 right-10 mt-2 ml-2  text-white font-semibold py-1 px-4 rounded">
      Apply
    </button>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <ul className="text-sm text-black-500">
        <li><strong> Min Experience :</strong> {item.min_qualification}</li>
        <li><strong> Min Qualification :</strong> {item.min_experience}</li>
        <li><strong>Gender :</strong> {item.gender}</li>
        <li><strong>Location :</strong> {item.city}</li>
      </ul>
    </div>
  </div>
      ))}
    </div>
  );
};

export default Career;
