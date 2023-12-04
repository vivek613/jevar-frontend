import React from "react";
import { Dialog } from "@material-tailwind/react";
import Lottie from "lottie-react";
import Loaders from "../Assets/Lottie/animation_lkidomwa.json";
import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((state: any) => state.loader);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loaders,
  };
  return (
    <Dialog
      open={loader.isShow}
      handler={() => {}}
      className="bg-transparent shadow-none border-none outline-none flex items-center justify-center"
    >
      <Lottie
        animationData={Loaders}
        loop={true}
        autoPlay={true}
        style={{ width: 200, height: 200 }}
      />
    </Dialog>
  );
};

export default Loader;
