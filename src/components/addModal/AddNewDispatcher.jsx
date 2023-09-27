import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddNewDispatcher = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full">
          <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b border-white">
            <h2 className="text-[14px] text-white">Name Your Cycle</h2>
          </div>
          <div className="p-[16px] text-[12px]">
            <div className="flex justify-center items-center">
              <label>* account : </label>
              <input
                placeholder="account"
                type="text"
                className="h-[32px] w-[280px] bg-[#231e22] border rounded-md hover:border-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pt-9 sm:pb-4"></div>
          <div className="h-[56px] py-[13px] px-[16px] flex items-center justify-end border-t border-white">
            <div className="px-4 py-8 sm:px-6 flex justify-end">
              <button
                onClick={() => onClose(false)}
                className="w-[100px] h-[34px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2"
              >
                Cancel
              </button>
              <button className="w-[100px] h-[34px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-primary">
                Sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewDispatcher;