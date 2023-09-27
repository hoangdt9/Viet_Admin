import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from 'react-i18next';

const AddShift = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-[#3737379A]" aria-hidden="true">
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full">
          <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
            <h2 className="text-[14px] dark:text-white">{t("releaseManagement.shiftList.addBasicSchedule")}</h2>
          </div>
          <div className="p-[16px] text-[12px]">
            <div className="dark:text-white">
                <div className="py-[5px]">
                    <label><span className="text-primary">*</span> {t("releaseManagement.shiftList.selectSender")} : </label>
                </div>
              <div>
                <select
                    placeholder="shift name"
                    type="text"
                    className="p-[2px_7px] text-sm w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                >
                    <option disabled selected className='text-grey'>{t("releaseManagement.shiftList.pleaseSelectSender")}</option>
                    <option>xiafa01</option>
                    <option>MyZkSync</option>
                </select>
              </div>
            </div>
            <div className="dark:text-white mt-[30px]">
                <div className="py-[5px]">
                    <label><span className="text-primary">*</span> {t("releaseManagement.shiftList.selectShift")} : </label>
                </div>
              <div>
                <select
                    placeholder={t("releaseManagement.shiftList.selectShift")}
                    type="text"
                    className="p-[2px_7px] text-sm w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                >
                    <option disabled selected className='text-grey'>s{t("releaseManagement.shiftList.selectShift")}</option>
                    <option>spa 1</option>
                    <option>banji2</option>
                    <option>123</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-[70px] py-[20px] px-[16px] flex items-center justify-end border-t border-[#ece9e9] dark:border-white">
            <div className="px-4 py-8 sm:px-6 flex justify-end">
              <button
                onClick={() => onClose(false)}
                className="w-[100px] h-[34px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] border-[#8378788f] dark:border-white dark:text-white text-[12px] mx-2"
              >
                {t("releaseManagement.shiftList.cancel")}
              </button>
              <button className="w-[100px] h-[34px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-primary">
              {t("releaseManagement.shiftList.sure")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShift;