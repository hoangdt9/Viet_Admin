import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from 'react-i18next';

const AddShift = ({ isOpen, onClose }) => {

    const { t } = useTranslation();

  if (!isOpen) return null;

  const time = [
    [
        0, 6, 12, 18
    ],
    [
        1, 7, 13, 19
    ],
    [
        2, 8, 14, 20
    ],
    [
        3, 9, 15, 21
    ],
    [
        4, 10, 16, 22
    ],
    [
        5, 11, 17, 23
    ],
  ];


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-[#3737379A]" aria-hidden="true">
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full">
          <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
            <h2 className="text-[14px] dark:text-white">{t("releaseManagement.shiftList.newShift")}</h2>
          </div>
          <div className="p-[16px] text-[12px]">
            <div className="dark:text-white">
                <div className="py-[5px]">
                    <label><span className="text-primary">*</span> {t("releaseManagement.shiftList.shiftName")} : </label>
                </div>
              <div>
                <input
                    placeholder={t("releaseManagement.shiftList.shiftName")}
                    type="text"
                    className="p-[10px] h-[32px] w-[280px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-[25px]">
                <div className="dark:text-white">
                    <div className="py-[5px]">
                        <label><span className="text-primary">*</span> {t("releaseManagement.shiftList.operatingHours")} : </label>
                    </div>
                </div>
                <div className="px-[10px]">
                    <table className="w-full">
                        <thead>
                            <tr className=" border-b-[1px] border-[#ece9e9] dark:border-white">
                                <th className="text-center">
                                    <div className="flex items-center">
                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name="earlymorning" id="earlymorning" />
                                        <label className="hover:cursor-pointer dark:text-white" for ="earlymorning">
                                        {t("releaseManagement.shiftList.morning")}
                                        </label>
                                    </div>
                                </th>
                                <th className="text-center py-[10px]">
                                    <div className="flex items-center">
                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name="morning" id="morning" />
                                        <label className="hover:cursor-pointer dark:text-white" for ="morning">
                                        {t("releaseManagement.shiftList.morning")}
                                        </label>
                                    </div>
                                </th>
                                <th className="text-center py-[10px]">
                                    <div className="flex items-center">
                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name="afternoon" id="afternoon" />
                                        <label className="hover:cursor-pointer dark:text-white" for ="afternoon">
                                        {t("releaseManagement.shiftList.afternoon")}
                                        </label>
                                    </div>
                                </th>
                                <th className="text-center py-[10px]">
                                    <div className="flex items-center">
                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name="night" id="night" />
                                        <label className="hover:cursor-pointer dark:text-white" for ="night">
                                        {t("releaseManagement.shiftList.night")}
                                        </label>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                time.map((item, key) => {
                                    return(
                                        <>
                                            <tr key = {key}>
                                                <td className="text-center">
                                                    <div className="flex items-center">
                                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name={item[0]} id={item[0]} />
                                                        <label className="hover:cursor-pointer dark:text-white" for ={item[0]}>
                                                            {`${item[0]}:00 - ${item[0]}:59`}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="text-center py-[10px]">
                                                    <div className="flex items-center">
                                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name={item[1]} id={item[1]} />
                                                        <label className="hover:cursor-pointer dark:text-white" for ={item[1]}>
                                                            {`${item[1]}:00 - ${item[1]}:59`}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="text-center py-[10px]">
                                                    <div className="flex items-center">
                                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name={item[2]} id={item[2]} />
                                                        <label className="hover:cursor-pointer dark:text-white" for ={item[2]}>
                                                            {`${item[2]}:00 - ${item[2]}:59`}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="text-center py-[10px]">
                                                    <div className="flex items-center">
                                                        <input className="mr-[7px] hover:cursor-pointer text-primary" type="checkbox" name={item[3]} id={item[3]} />
                                                        <label className="hover:cursor-pointer dark:text-white" for ={item[3]}>
                                                            {`${item[3]}:00 - ${item[3]}:59`}
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })
                            }
                        </tbody>
                    </table>
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