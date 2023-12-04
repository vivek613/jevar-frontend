import React from "react";
import Carousel from "react-multi-carousel";
import { Image_URL } from "../../Service";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface CollectionInterface {
  data: Array<Number>;
}

const Collection: React.FC<CollectionInterface> = ({ data }) => {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
    >
      {data.map((item: any, index) => {
        const queryParams = new URLSearchParams(item).toString();
        return (
          <div
            className="slider cursor-pointer"
            key={index}
            onClick={() => navigate(`collection-list?${queryParams}`)}
          >
            <img
              src={`${item.category_image.data}`}
              alt="movie"
              className="w-36 h-48 object-cover"
            />
            <text>{item.collection_name}</text>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Collection;
