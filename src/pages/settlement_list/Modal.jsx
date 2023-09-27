import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { OrangeButton } from "../../components/ui/button/AgentManagement";
import { Select, TimePicker, Button, InputNumber, Radio, Input } from "antd";
import { BsPlus } from "react-icons/bs";
import dayjs from "dayjs";
import "../agent_management/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDebitCardsInfo,
  addDebitCard,
} from "../../redux/financial/debit-card/debitCardReducer";
import DateRangePicker from "rsuite/DateRangePicker";
import { Helmet } from "react-helmet";
import { Excelexport } from "../../components/ExcelExport";
import groupListService from "../../services/permission/groupListService";

const Modal = ({
  isOpen,
  onClose,
  name,
  setModalName,
  onCancelHandler,
  onClickHandlers,
  data = {},
  setData,
  excelData,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [debitCardData, setDebitCardData] = useState([]);
  const [value, setValue] = useState(new Date());
  const { allMerchants } = useSelector((state) => state.permissionState);


  const changeHandler = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(groupListService.getMerchants());
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // onClose(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Clean up when onClose function changes

  useEffect(() => {
    console.log("getDebitCardsInfo:", data);
    dispatch(getDebitCardsInfo());
  }, [dispatch]);
  if (!isOpen) return null;

  const onDebitChangeHandler = (e) => {
    e.preventDefault();
    setDebitCardData({
      ...debitCardData,
      [e.target.name]: e.target.value,
    });
  };

  const onCancelClick = () => {
    onCancelHandler();
  };
  const onConfirmationClick = () => {
    onCancelHandler();
  };
  const onSureClick = () => {};
  const onThatDayClick = () => {};
  const onThreeDayClick = () => {};
  const onSevenDayClick = () => {};
  const onKeepHandler = () => {
    onClickHandlers?.setUp();
    onClose();
  };
  return (
    <>
      <Helmet>
        <link href="./rsuite.css" rel="stylesheet" />
      </Helmet>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="!flex items-start justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity bg-[#3737379A]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-transparent opacity-75"></div>
          </div>
          <div>
            {name === "export_data" && (
              <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
                {/* Start header section */}
                <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                  <div>
                    <h2 className="text-[14px] dark:text-white">
                      {t("settlement_list.selectExportRange")}
                    </h2>
                  </div>
                  <div>
                    <button className="" onClick={() => onClose(false)}>
                      x
                    </button>
                  </div>
                </div>

                {/* Start content section */}
                <div className="flex flex-col justify-start items-start ">
                  <div className="flex justify-start text-xs items-center mt-3 w-full">
                    <label
                      htmlFor=""
                      className=" text-grey-dark dark:text-white w-1/4 text-right mr-2"
                    >
                      export by data:
                    </label>

                    <DateRangePicker
                      value={value}
                      onChange={setValue}
                      size="md"
                      color="violet"
                    />
                  </div>
                  {/* Start Amount of */}
                  <div className="flex justify-start text-xs items-center mt-3 w-full">
                    <label
                      htmlFor=""
                      className=" text-grey-dark dark:text-white w-1/4 text-right mr-2"
                    >
                      Amount of:
                    </label>
                    <div className="">
                      <Excelexport
                        excelData={excelData}
                        fileName={"that day"}
                        name={"that day"}
                      />
                      <Excelexport
                        excelData={excelData}
                        fileName={"nearly three day"}
                        name={"nearly three day"}
                      />
                      <Excelexport
                        excelData={excelData}
                        fileName={"nearly seven day"}
                        name={"nearly seven day"}
                      />
                      {/* <button onClick={onThatDayClick} className="text-white px-2 py-1 border border-primary dark:text-white dark:border-white dark:hover:border-primary">that day</button>
                      <button onClick={onThreeDayClick} className="text-white px-2 py-1 border border-primary dark:text-white dark:border-white dark:hover:border-primary">nearly three days</button>
                      <button onClick={onSevenDayClick} className="text-white px-2 py-1 border border-primary dark:text-white dark:border-white dark:hover:border-primary">nearly seven days</button> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center pr-4 py-2 mb-2">
                  <Excelexport
                    excelData={excelData}
                    fileName={"that day"}
                    name={"confirmation"}
                  />
                  <button
                    onClick={onCancelClick}
                    className="px-2 py-1 text-xs rounded-sm border border-primary text-grey-dark dark:bg-grey-dark dark:border-white dark:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="min-h-screen flex flex-col justify-center items-center">
            {name === "setup" && (
              <div className="inline-block h-fit align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:min-w-[500px] sm:w-full">
                {/* Start header section */}
                <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                  <div>
                    <h2 className="text-[14px] dark:text-white">
                      {t("merchantList.withdrawalSettings")}
                    </h2>
                  </div>
                  <div>
                    <button className="" onClick={() => onClose(false)}>
                      x
                    </button>
                  </div>
                </div>

                {/* Start content section */}
                <div className="px-4 py-5 flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.withdrawalTypeRestrictions")}
                    </p>
                    <Radio.Group
                      defaultValue={data?.withdrawalType}
                      buttonStyle="solid"
                      onChange={(e) =>
                        changeHandler("withdrawalType", e.target.value)
                      }
                    >
                      <Radio.Button value="only pay" defaultChecked>
                        <span className="text-xs">
                          {t("merchantList.onlyPay")}
                        </span>
                      </Radio.Button>
                      <Radio.Button value="only issued">
                        <span className="text-xs">
                          {t("merchantList.onlyIssued")}
                        </span>
                      </Radio.Button>
                      <Radio.Button value="all">
                        <span className="text-xs">{t("merchantList.all")}</span>
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.onlineBanking")}
                    </p>
                    <Radio.Group
                      defaultValue={data?.banking}
                      buttonStyle="solid"
                      onChange={(e) => changeHandler("banking", e.target.value)}
                    >
                      <Radio.Button value="hand silver" defaultChecked>
                        <span className="text-xs">
                          {t("merchantList.handMoney")}
                        </span>
                      </Radio.Button>
                      <Radio.Button value="online banking">
                        <span className="text-xs">
                          {t("merchantList.onlineBanking")}
                        </span>
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.tcbVersion")}
                    </p>
                    <Radio.Group
                      defaultValue={data?.TCB_version}
                      buttonStyle="solid"
                      onChange={(e) =>
                        changeHandler("TCB_version", e.target.value)
                      }
                    >
                      <Radio.Button value="Old APP">
                        <span className="text-xs">
                          {t("merchantList.oldApp")}
                        </span>
                      </Radio.Button>
                      <Radio.Button value="New APP" defaultChecked>
                        <span className="text-xs">
                          {t("merchantList.newApp")}
                        </span>
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.dailyWithdrawalLimit")}
                    </p>
                    <InputNumber
                      className="text-xs w-full"
                      defaultValue={data?.dailyWithdrawalLimit}
                      onChange={(e) => changeHandler("dailyWithdrawalLimit", e)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <p className="text-xs text-[rgba(0,0,0,0.85)]">
                        {t("merchantList.withdrawalTypeRestrictions")}
                      </p>
                      <Radio.Group defaultValue="onlypay" buttonStyle="solid">
                        <Radio.Button value="onlypay" defaultChecked>
                          <span className="text-xs">
                            {t("merchantList.onlyPay")}
                          </span>
                        </Radio.Button>
                        <Radio.Button value="onlyissued">
                          <span className="text-xs">
                            {t("merchantList.onlyIssued")}
                          </span>
                        </Radio.Button>
                        <Radio.Button value="all">
                          <span className="text-xs">
                            {t("merchantList.all")}
                          </span>
                        </Radio.Button>
                      </Radio.Group>
                      <InputNumber
                        className="text-xs w-full"
                        defaultValue={data?.single_minimum}
                        onChange={(e) => changeHandler("single_minimum", e)}
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-xs text-[rgba(0,0,0,0.85)]">
                        {t("merchantList.onlineBanking")}
                      </p>
                      <InputNumber
                        className="text-xs w-full"
                        onChange={(e) => changeHandler("single_maximum", e)}
                        defaultValue={data?.single_maximum}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.lowBalanceAlert")}
                    </p>
                    <Input
                      className="border !border-[#d9d9d9] rounded-md text-xs"
                      defaultValue={data?.lowBalanceAlert}
                      onChange={(e) =>
                        changeHandler("lowBalanceAlert", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.loginAccount")}
                    </p>
                    <Input
                      className="border !border-[#d9d9d9] rounded-md text-xs"
                      defaultValue={data?.loginAccount}
                      onChange={(e) =>
                        changeHandler("loginAccount", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[hsla(0,0%,0%,1)]">
                      {t("merchantList.loginPassword")}
                    </p>
                    <Input
                      type="password"
                      className="border !border-[#d9d9d9] rounded-md text-xs"
                      defaultValue={data?.loginPassword}
                      onChange={(e) =>
                        changeHandler("loginPassword", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.fixedOTP")}
                    </p>
                    <Input
                      type="text"
                      className="border !border-[#d9d9d9] rounded-md text-xs"
                      defaultValue={data?.fixedOTP}
                      onChange={(e) =>
                        changeHandler("fixedOTP", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-xs text-[rgba(0,0,0,0.85)]">
                      {t("merchantList.restrictMerchant")}
                    </p>
                    <Select
                      placeholder={t(
                        "agentmanagement.merchant.applicableMerchants"
                      )}
                      className="text-[#231e22] w-full text-xs"
                      mode="multiple"
                      value={data?.restrictMerchants}
                      onChange={(e) => changeHandler("restrictMerchants", e)}
                      allowClear
                    >
                      {allMerchants?.map((merchant, key) => (
                        <Select.Option key={key} value={merchant._id}>
                          {merchant.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  {/* <div className="flex flex-col gap-y-2">
                  <p className="text-xs text-[rgba(0,0,0,0.85)]">
                    {t("merchantList.restrictMerchantGroups")}
                  </p>
                  <Input
                    className="border !border-[#d9d9d9] rounded-md text-xs"
                    placeholder={t("merchantList.restrictMerchantGroups")}
                  />
                </div> */}
                </div>
                <div className="flex flex-row pl-4 py-2">
                  <button
                    onClick={onKeepHandler}
                    className="px-4 py-1 rounded-sm border bg-primary border-white text-white text-xs dark:bg-grey-dark dark:border-primary dark:text-white"
                  >
                    {t("merchantList.keep")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
