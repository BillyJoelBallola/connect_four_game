import React from "react";

const CustomModal = ({ children }) => {
  return (
    <div className="absolute z-20 inset-0 overflow-hidden grid place-items-center bg-black/50">
      <div className="bg-white sm-border p-8">{children}</div>
    </div>
  );
};

export default CustomModal;
