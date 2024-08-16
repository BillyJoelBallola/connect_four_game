import React from "react";

const CustomModal = ({ children, isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "grid" : "hidden"
      } absolute z-20 h-screen w-screen overflow-hidden  place-items-center bg-black/80`}
    >
      <div className="bg-white sm-border p-8 w-[84%] md:w-auto">{children}</div>
    </div>
  );
};

export default CustomModal;
