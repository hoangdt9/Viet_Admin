import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from 'react-i18next';

import groupListService from "../../services/permission/groupListService";

const AddMerchant = ({ isOpen, onClose, id }) => {

  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();

  console.log(id);
  const { t } = useTranslation();
  if (!isOpen) return null;

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  }

  const handleSubmit = () => {

    dispatch(groupListService.addMerchantInProxy({
      account : userNickname,
      name : userName,
      password : password,
      proxyId : id,
      paymentRate : ""
    }))
    .then(res => {
      if(res.success){
        setUserName("");
        setUserNickname("");
        setPassword("");
        setUserType("");
        onClose();
        dispatch(groupListService.getAllProxies());
      }
      else{
        //error 
      }
    });
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-[#3737379A]" aria-hidden="true">
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full">
          <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
            <h2 className="text-[14px] dark:text-white">{t("agentmanagement.proxylist.newUser")}</h2>
          </div>
          <div className="p-[16px] text-[12px] text-end pr-[80px]">
            <div className="dark:text-white">
              <div className="py-[5px]">
                <label className="mr-2"><span className="text-primary mr-1">*</span> {t("agentmanagement.proxylist.newUser")} : </label>
                <input
                    value={userName}
                    onChange={handleUserNameChange}
                    placeholder={t("agentmanagement.proxylist.newUser")}
                    type="text"
                    className="mt-2 text-[14px] p-[10px] h-[25px] w-[280px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="dark:text-white">
              <div className="py-[5px]">
                <label className="mr-2"><span className="text-primary mr-1">*</span> {t("agentmanagement.proxylist.nickname")} : </label>
                <input
                    value={userNickname}
                    onChange={handleUserNicknameChange}
                    placeholder={t("agentmanagement.proxylist.nickname")}
                    type="text"
                    className="mt-2 text-[14px] p-[10px] h-[25px] w-[280px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="dark:text-white">
              <div className="py-[5px]">
                <label className="mr-2"><span className="text-primary mr-1">*</span> {t("agentmanagement.proxylist.password")} : </label>
                <input
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder={t("agentmanagement.proxylist.password")}
                    type="text"
                    className="mt-2 text-[14px] p-[10px] h-[25px] w-[280px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="dark:text-white">
              <div className="py-[5px]">
                <label className="mr-2"><span className="text-primary mr-1">*</span> {t("agentmanagement.proxylist.userType")} : </label>
                <input
                    value={userType}
                    onChange={handleUserTypeChange}
                    placeholder={t("agentmanagement.proxylist.newUser")}
                    type="text"
                    className="mt-2 text-[14px] p-[10px] h-[25px] w-[280px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
                />
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
              <button className="w-[100px] h-[34px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-primary" 
                onClick={handleSubmit}
              >
              {t("releaseManagement.shiftList.sure")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMerchant;