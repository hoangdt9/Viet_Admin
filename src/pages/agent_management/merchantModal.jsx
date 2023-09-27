import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { OrangeButton } from "../../components/ui/button/AgentManagement";
import { Select, TimePicker, Button, InputNumber, Tag, Input } from "antd";
import { BsPlus } from "react-icons/bs";
import dayjs from "dayjs";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDebitCardsInfo,
  addDebitCard,
} from "../../redux/financial/debit-card/debitCardReducer";

import groupListService from "../../services/permission/groupListService";
import { AiOutlineMinusCircle } from "react-icons/ai";

import Notification from "../../components/notification/notification";
import Img_ABB from '../../assets/images/mark/abb.png';
import Img_ACB from '../../assets/images/mark/acb.png';
import Img_AGB from '../../assets/images/mark/agb.png';
import Img_BIDV from '../../assets/images/mark/bidv.png';
import Img_DGB from '../../assets/images/mark/dgb.png';
import Img_EXIM from '../../assets/images/mark/exim.png';
import Img_MBBank from '../../assets/images/mark/mbbank.png';
import Img_OCB from '../../assets/images/mark/ocb.png';
import Img_STB from '../../assets/images/mark/stb.png';
import Img_TCB from '../../assets/images/mark/tcb.png';
import Img_TPB from '../../assets/images/mark/tpb.png';
import Img_VCB from '../../assets/images/mark/vcb.png';
import Img_VIB from '../../assets/images/mark/vib.png';
import Img_VNMOMO from '../../assets/images/mark/vnmomo.png';
import Img_VPB from '../../assets/images/mark/vpb.png';
import Img_VTB from '../../assets/images/mark/vtb.png';

const MerchantModal = ({
  isOpen,
  onClose,
  name,
  setModalName,
  onCancelHandler,
  onClickHandlers,
  data = {},
  viewId,
  setData,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [debitCardData, setDebitCardData] = useState([]);
  const [newTag, setNewTag] = useState({});
  const [removeTagId, setRemoveTagId] = useState("");
  const { labels } = useSelector((state) => state.collectionState);
  const { editProxy, allMerchants } = useSelector(
    (state) => state.permissionState
  );
  const [tableData, setTableData] = useState([]);
  const [timeLimits, setTimeLimits] = useState(false);
  const [amountLimits, setAmountLimits] = useState(false);

  const [channelType, setChannelType] = useState("");
  const [channelName, setChannelName] = useState("");
  const [rate, setRate] = useState("");
  const [state, setState] = useState(false);

  const changeHandler = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const newGateClick = () => {
    name === "newGate" ? onClickHandlers?.newGate() : onClickHandlers?.editGate();
    onClose(false)
  }

  useEffect(() => {
    if (name === "newGate") dispatch(groupListService.getMerchants());

  }, []);

  useEffect(() => {
    if (data.collection_time_to || data.collection_time_from)
      setTimeLimits(true);
    else setTimeLimits(false);
    if (data.receipt_amount_from || data.receipt_amount_to)
      setAmountLimits(true);
    else setAmountLimits(false);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // if (modalRef.current && !modalRef.current.contains(event.target)) {
      //   // onClose(false);
      // }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Clean up when onClose function changes

  useEffect(() => {
    console.log("getDebitCardsInfo");
    dispatch(getDebitCardsInfo());
  }, [dispatch]);

  useEffect(() => {
    if (viewId && viewId !== "") {
      console.log(viewId);
      dispatch(groupListService.getEditProxy(viewId));
    }
  }, [dispatch, viewId]);

  useEffect(() => {
    let temp = [];
    console.log(editProxy);
    if (Object.keys(editProxy).length !== 0) {
      editProxy.members.map((item, key) => {
        temp.push({
          nickName: item.name,
          billableAmount: "101,011,100,641.21",
          t1Amount: "0",
          state: [
            t("agentmanagement.merchant.normal"),
            t("agentmanagement.merchant.Audited"),
          ],
        });
      });
    }

    setTableData(temp);
  }, [editProxy]);

  if (!isOpen) return null;

  const getLabelColor = (label) => {
    switch (label.toLowerCase()) {
      case "pink":
        return "text-[#f5317f]";
      case "red":
        return "text-[#f04134]";
      case "orange":
        return "text-[#f56a00]";
      case "blue":
        return "text-[#00a2ae]";
      case "purple":
        return "text-[#7265e6]";
    }
  };

  const getLabelBg = (label) => {
    switch (label.toLowerCase()) {
      case "pink":
        return "bg-[#fdd8e7]";
      case "red":
        return "bg-[#fcdbd9]";
      case "orange":
        return "bg-[#fde3cf]";
      case "blue":
        return "bg-[#cfedf0]";
      case "purple":
        return "bg-[#e4e2fa]";
    }
  };
  const colorPallet = [
    {
      name: "pink",
      label: t("collectionManagement.bankCardManagement.pink"),
    },
    {
      name: "red",
      label: t("collectionManagement.bankCardManagement.red"),
    },
    {
      name: "orange",
      label: t("collectionManagement.bankCardManagement.orange"),
    },
    {
      name: "blue",
      label: t("collectionManagement.bankCardManagement.blue"),
    },
    {
      name: "purple",
      label: t("collectionManagement.bankCardManagement.purple"),
    },
  ];

  const TagButton = ({
    name,
    bgColor,
    width = "w-[62px]",
    color = "text-white",
    borderType = false,
    onClickHandler,
  }) => {
    return (
      <button
        className={`h-[20px] py-3 rounded-[4px] flex justify-center items-center text-xs border hover:text-[#108ee9] hover:border-[#108ee9] ${!borderType && "border-dashed"
          } ${bgColor} ${width} ${color}`}
        onClick={onClickHandler}
      >
        {name}
      </button>
    );
  };

  const NewTagButton = () => (
    <button
      className={`h-[20px] py-3 rounded-[4px] flex justify-center w-[110px] items-center text-xs border hover:text-[#108ee9] hover:border-[#108ee9] ${newTag?.bg ?? "bg-[#fff]"
        } ${newTag?.color ?? "rgba(0,0,0,0.65)"} ${!newTag?.default && "border-dashed"
        }`}
    >
      tab preview
    </button>
  );

  const ColorButton = ({ name, bgColor, color, onClickHandler }) => (
    <button
      className={`w-[62px] h-[20px] rounded-[4px] flex justify-center items-center text-xs ${bgColor} ${color}`}
      onClick={onClickHandler}
    >
      {name}
    </button>
  );

  const header = [
    {
      name: t("agentmanagement.merchant.nickname"),
      width: "w-[15%]",
    },
    {
      name: t("agentmanagement.merchant.billableAmount"),
      width: "w-[32%]",
    },
    {
      name: t("agentmanagement.merchant.t1Amount"),
      width: "w-[16%]",
    },
    {
      name: t("agentmanagement.merchant.state"),
      width: "w-[26%]",
    },
    {
      name: t("agentmanagement.merchant.operate"),
    },
  ];

  const rateModalHeader = [
    {
      name: t("agentmanagement.merchant.aisle"),
      width: "w-[16%]",
    },
    {
      name: t("agentmanagement.merchant.rate"),
      width: "w-[16%]",
    },
    {
      name: t("agentmanagement.merchant.settlementType"),
      width: "w-[34%]",
    },
    {
      name: t("agentmanagement.merchant.operate"),
      width: "w-[34%]",
    },
  ];

  const handleToggle = () => { };

  const clickDetail = () => { };
  const onDebitChangeHandler = (e) => {
    e.preventDefault();
    setDebitCardData({
      ...debitCardData,
      [e.target.name]: e.target.value,
    });
  };
  const addDebitCardHandler = () => {
    dispatch(addDebitCard(debitCardData));
    onCancelHandler();
  };

  const onClickRemoveTimeLimit = () => {
    setTimeLimits(false);
    let newState = { ...data }; // Copy the state
    delete newState?.collection_time_from;
    delete newState?.collection_time_to;
    setData(newState); // Set the state with the copy
  };

  const onClickRemoveAmountLimit = () => {
    setAmountLimits(false);
    let newState = { ...data }; // Copy the state
    delete newState?.receipt_amount_from;
    delete newState?.receipt_amount_to;
    setData(newState); // Set the state with the copy
  };

  const handleChannelSubmit = () => {
    if (channelType && channelName && rate) {
      groupListService.addChannelInProxy({
        channelType: channelType,
        channelName: channelName,
        state: state ? "opened" : "closure",
        rate: rate,
        proxyId: viewId
      })
        .then(res => {
          if (res.success) {
            setChannelName("");
            setChannelType("");
            setRate("");
            setState("");
            onClose();
            dispatch(groupListService.getAllProxies());
          }
          else {
            //error 
          }
        });
    }
    else {
      modalRef.current.openNotificationWithIcon({ type: "error", title: "Error", description: "All input values are required." });
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-[#3737379A]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div>
          {name === "merchant" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[800px] sm:w-full">
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {t("agentmanagement.merchant.merchantList")}
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>
              <div className="px-[16px] py-[16px]">
                <div className="leading-6 py-2.5 text-xs text-[rgba(0,0,0,0.65) flex items-center bg-[#f7f7f7] dark:bg-[#3e3c3b]">
                  {header.map((header, key) => (
                    <div
                      className={`${header.width} px-2 font-medium text-[rgba(0,0,0,0.85)] dark:text-white`}
                      key={key}
                    >
                      {header.name}
                    </div>
                  ))}
                </div>
                <table>
                  <tbody className="merchantModal">
                    {tableData.map((item, key) => (
                      <tr
                        className="border-solid border-b-[1px] border-[#ece9e9] text-[12px]"
                        key={key}
                      >
                        <td className="w-[15%] dark:text-white">
                          {item.nickName}
                        </td>
                        <td
                          className={`w-[32%] ${item.billableAmount !== "0"
                            ? "text-[#4c90dd]"
                            : "dark:text-white"
                            } text-[18px]`}
                        >
                          {item.billableAmount}{" "}
                          <span className="text-[14px]">
                            {item.billableAmount !== "0"
                              ? "billion yuan"
                              : "yuan"}
                          </span>
                        </td>
                        <td
                          className={`w-[16%] ${item.t1Amount > 0
                            ? "text-[#4c90dd]"
                            : "dark:text-white"
                            } text-[18px]`}
                        >
                          {item.t1Amount}{" "}
                          <span className="text-[14px]">yuan</span>
                        </td>
                        <td className="w-[24%]">
                          {item.state.map((state, key) => (
                            <button
                              key={key}
                              className={`mr-[6px] ${state === "normal" || state === "Audited"
                                ? "text-[#00a854] bg-[#cfefdf]"
                                : "text-[#f04134] bg-[#fcdbd9]"
                                } rounded-[3px] px-3 py-[2px]`}
                            >
                              {state}
                            </button>
                          ))}
                        </td>
                        <td>
                          <button
                            className="text-primary text-left"
                            onClick={clickDetail}
                          >
                            {t("agentmanagement.merchant.checkTheDetail")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "add_debit_card" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "}
                    {t("financial.debitcard.addPaymentCard")}
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>
              {/* Start content section */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center mt-5 w-3/5">
                  <label
                    htmlFor=""
                    className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    {t("financial.debitcard.name")}:
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={onDebitChangeHandler}
                    className="ml-2 dark:text-white dark:bg-dark dark:bordr-white p-[3px_5px] w-56"
                  />
                </div>
                <div className="flex justify-center items-center mt-5 w-3/5">
                  <label
                    htmlFor=""
                    className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    {t("financial.debitcard.bankName")}:
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    onChange={onDebitChangeHandler}
                    className="ml-2 dark:bg-dark dark:text-white dark:bordr-white p-[3px_5px] w-56"
                  />
                </div>
                <div className="flex justify-center items-center mt-5 w-3/5">
                  <label
                    htmlFor=""
                    className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    {t("financial.debitcard.bankAccount")}
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    onChange={onDebitChangeHandler}
                    className="ml-2 dark:bg-dark dark:text-white dark:bordr-white p-[3px_5px] w-56"
                  />
                </div>
                <button
                  onClick={addDebitCardHandler}
                  className="mt-6 mb-6 p-[2px_10px] rounded-sm border border-primary text-grey-dark dark:bg-grey-dark dark:border-primary dark:text-white"
                >
                  {t("financial.debitcard.keep")}
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "modifyChannel" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t(
                        "agentmanagement.merchant.modifyChannelSettingsInBatches"
                      )}
                    </h2>
                  </div>
                  <div className="p-[16px] text-[12px]">
                    <div className="dark:text-white flex pb-[30px]">
                      <div className="py-[5px] min-w-[80px]">
                        <label>
                          <span className="text-primary">*</span>
                          {t("agentmanagement.merchant.channelType")}
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <select
                          placeholder="shift name"
                          type="text"
                          className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary text-xs"
                          onChange={(e) => { setChannelType(e.target.value) }}
                        >
                          <option>
                            {t("agentmanagement.merchant.VietnamCardToCard")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamZALO")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamMOMO")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamDirect")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamBankScanCode")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamViettlePay")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.payOnBehaif")}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="dark:text-white flex pb-[30px]">
                      <div className="py-[5px] min-w-[80px]">
                        <label>
                          <span className="text-primary">*</span>{" "}
                          {t("agentmanagement.merchant.channelName")}
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <input value={channelName} onChange={(e) => { setChannelName(e.target.value) }} placeholder="shift name" type="text" className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary text-xs" />
                      </div>
                    </div>
                    <div className="dark:text-white flex pb-[30px]">
                      <div className="py-[5px] min-w-[80px]">
                        <label>
                          <span className="text-primary">*</span>{" "}
                          {t("agentmanagement.merchant.rate")} (%)
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <input
                          type="number"
                          className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary text-xs"
                          value={rate} onChange={(e) => { setRate(e.target.value) }}
                        ></input>
                      </div>
                    </div>
                    <div className="dark:text-white flex">
                      <div className="py-[5px] min-w-[80px]">
                        <label>
                          <span className="text-primary">*</span>{" "}
                          {t("agentmanagement.merchant.state")}
                        </label>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="pl-[40px] min-w-[300px]">
                          <Switch
                            // checked={darkMode}
                            checked={state}
                            className="flex items-center"
                            color="warning"
                            onChange={(e) => { setState(!state) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[70px] py-[20px] px-[16px] flex items-center justify-end border-t border-[#ece9e9] dark:border-white">
                    <div className="px-4 py-8 sm:px-6 flex justify-end">
                      <button
                        onClick={() => onClose(false)}
                        className="w-[100px] h-[34px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] border-[#8378788f] dark:border-white dark:text-white text-[12px] mx-2"
                      >
                        {t("agentmanagement.merchant.cancel")}
                      </button>
                      <button className="w-[100px] h-[34px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-primary" onClick={handleChannelSubmit}>
                        {t("agentmanagement.merchant.sure")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "rateStep1" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex justify-between items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t("agentmanagement.merchant.rateSetting")}
                    </h2>
                    <button className="" onClick={() => onClose(false)}>
                      ×
                    </button>
                  </div>
                  <div className="p-[16px]">
                    <div className="w-fit">
                      <OrangeButton
                        label={t("agentmanagement.merchant.addNewRate")}
                        onClickHandler={() => {
                          setModalName("rateStep2");
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="py-[16px]">
                        <div className="leading-6 py-2.5 text-xs text-[rgba(0,0,0,0.65) flex items-center bg-[#f7f7f7] dark:bg-[#3e3c3b]">
                          {rateModalHeader.map((header, key) => (
                            <div
                              className={`${header.width} px-2 font-medium text-[rgba(0,0,0,0.85)] dark:text-white`}
                              key={key}
                            >
                              {header.name}
                            </div>
                          ))}
                        </div>
                        <div className="w-full py-4 text-center text-xs text-[rgba(0,0,0,0.43)] border-b border-[#e9e9e9]">
                          {t("agentmanagement.merchant.noData")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "rateStep2" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t(
                        "agentmanagement.merchant.modifyChannelSettingsInBatches"
                      )}
                    </h2>
                  </div>
                  <div className="p-[16px] text-[12px]">
                    <div className="dark:text-white flex pb-[30px]">
                      <div className="py-[5px] w-[80px]">
                        <label>
                          <span className="text-primary">*</span>
                          {t("agentmanagement.merchant.channelType")}
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <select
                          placeholder="shift name"
                          type="text"
                          value={data?.channelType}
                          onChange={(e) => changeHandler("channelType", e.target.value)}
                          className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-[#eb6932] focus:border-[#eb6932] text-xs"
                        >
                          <option>
                            {t("agentmanagement.merchant.VietnamCardToCard")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamZALO")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamMOMO")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamDirect")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamBankScanCode")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.vietnamViettlePay")}
                          </option>
                          <option>
                            {t("agentmanagement.merchant.payOnBehaif")}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="dark:text-white flex pb-[30px]">
                      <div className="py-[5px] w-[80px]">
                        <label className="flex items-center">
                          <span className="text-primary">*</span>{" "}
                          {t("agentmanagement.merchant.fixedRate")} (%)
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <input
                          type="number"
                          onChange={(e) => changeHandler("rate", e.target.value)}
                          value={data?.rate}
                          className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-[#eb6932] focus:border-[#eb6932] text-xs"
                        ></input>
                      </div>
                    </div>
                    <div className="dark:text-white flex">
                      <div className="py-[5px] w-[80px]">
                        <label className="flex items-center">
                          <span className="text-primary">*</span>{" "}
                          {t("agentmanagement.merchant.settlementType")} (T+)
                        </label>
                      </div>
                      <div className="pl-[40px] min-w-[300px]">
                        <input
                          type="number"
                          onChange={(e) => changeHandler("settlementType", e.target.value)}
                          value={data?.settlementType}
                          className="pl-[7px] h-[32px] w-full dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-[#eb6932] focus:border-[#eb6932] text-xs"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end dark:border-white">
                    <div className="pb-8 flex justify-center w-full">
                      <button className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={onClickHandlers?.addRate}
                      >
                        {t("agentmanagement.merchant.keep")}
                      </button>
                      <button
                        onClick={() => onClose(false)}
                        className="w-[75px] h-[28px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] border-[#8378788f] dark:border-white dark:text-white text-[12px] mx-2"
                      >
                        {t("agentmanagement.merchant.cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {(name === "newGate" || name === "editGate") && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t(
                        "agentmanagement.merchant.modifyChannelSettingsInBatches"
                      )}
                    </h2>
                  </div>
                  {/* Modal */}
                  <div className="p-5 flex flex-col gap-y-4">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] w-1/4 text-right">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.selectChannel")}
                        </span>
                      </p>
                      <Select
                        placeholder={t(
                          "agentmanagement.merchant.applicableMerchants"
                        )}
                        className="text-[#231e22] w-3/4"
                        onChange={(e) => changeHandler("channel", e)}
                        value={data?.channel}
                      >
                        <Select.Option value="vietnamCardToCard">
                          {t("agentmanagement.merchant.vietnamCardToCard")}
                        </Select.Option>
                        <Select.Option value="vietnamZALO">
                          {t("agentmanagement.merchant.vietnamZALO")}
                        </Select.Option>
                        <Select.Option value="vietnamMOMO">
                          {t("agentmanagement.merchant.vietnamMOMO")}
                        </Select.Option>
                        <Select.Option value="vietnamDirect">
                          {t("agentmanagement.merchant.vietnamDirect")}
                        </Select.Option>
                        <Select.Option value="vietnamBankScanCode">
                          {t("agentmanagement.merchant.vietnamBankScanCode")}
                        </Select.Option>
                        <Select.Option value="vietnamViettelPay">
                          {t("agentmanagement.merchant.vietnamViettelPay")}
                        </Select.Option>
                        <Select.Option value="InnerFilling">
                          {t("agentmanagement.merchant.InnerFilling")}
                        </Select.Option>
                        <Select.Option value="returnedMessages">
                          {t("agentmanagement.merchant.returnedMessages")}
                        </Select.Option>
                      </Select>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.applicableMercha")}
                        </span>
                      </p>
                      <div className="flex flex-col w-3/4">
                        <Select
                          placeholder={t(
                            "agentmanagement.merchant.applicableMerchants"
                          )}
                          className="text-[#231e22] w-full"
                          mode="multiple"
                          value={data?.merchants}
                          onChange={(e) => changeHandler("merchants", e)}
                          allowClear
                        >
                          {allMerchants?.map((merchant, key) => (
                            <Select.Option key={key} value={merchant.name}>
                              {merchant.name}
                            </Select.Option>
                          ))}
                        </Select>
                        <p className="text-xs dark:text-white">
                          {t(
                            "agentmanagement.merchant.ifNotSelected,AllMerchantsAreDefaulted."
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.paymentDeviceType")}
                        </span>
                      </p>
                      <Select
                        placeholder={t(
                          "agentmanagement.merchant.selectPaymentDeviceType"
                        )}
                        className="text-[#231e22] w-3/4"
                        value={data?.payment_device}
                        onChange={(e) => changeHandler("payment_device", e)}
                        allowClear
                      >
                        <Select.Option
                          value={t("agentmanagement.merchant.mobileTerminal")}
                        >
                          {t("agentmanagement.merchant.mobileTerminal")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.computer")}
                        >
                          {t("agentmanagement.merchant.computer")}
                        </Select.Option>
                      </Select>
                    </div>
                    {/* <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.collectionArea")}
                        </span>
                      </p>
                      <Select
                        placeholder={t(
                          "agentmanagement.merchant.selectPaymentArea"
                        )}
                        value={data?.collection_area}
                        onChange={(e) => changeHandler("collection_area", e)}
                        className="text-[#231e22] w-3/4"
                        allowClear
                      >
                        <Select.Option
                          value={t("agentmanagement.merchant.beiging")}
                        >
                          {t("agentmanagement.merchant.beiging")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.tianjin")}
                        >
                          {t("agentmanagement.merchant.tianjin")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.hebei")}
                        >
                          {t("agentmanagement.merchant.hebei")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.shanxi")}
                        >
                          {t("agentmanagement.merchant.shanxi")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.InnerMongolia")}
                        >
                          {t("agentmanagement.merchant.InnerMongolia")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.liaoning")}
                        >
                          {t("agentmanagement.merchant.liaoning")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.jilin")}
                        >
                          {t("agentmanagement.merchant.jilin")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.heilongjiang")}
                        >
                          {t("agentmanagement.merchant.heilongjiang")}
                        </Select.Option>
                      </Select>
                    </div> */}
                    {/* payment method */}
                    {/* <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.paymentMethod")}
                        </span>
                      </p>
                      <Select
                        placeholder={t(
                          "agentmanagement.merchant.choosePaymentMethod"
                        )}
                        value={data?.payment_method}
                        onChange={(e) => changeHandler("payment_method", e)}
                        className="text-[#231e22] w-3/4"
                        mode="multiple"
                        allowClear
                      >
                        <Select.Option
                          value={t(
                            "agentmanagement.merchant.vietnamCardToCard"
                          )}
                        >
                          {t("agentmanagement.merchant.vietnamCardToCard")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.vietnamZALO")}
                        >
                          {t("agentmanagement.merchant.vietnamZALO")}
                        </Select.Option>
                        <Select.Option
                          value={t("agentmanagement.merchant.vietnamCardMOMO")}
                        >
                          {t("agentmanagement.merchant.vietnamCardMOMO")}
                        </Select.Option>
                      </Select>
                    </div> */}
                    {/* collection time */}
                    <div className="flex gap-x-2">
                      <p className="text-xs dark:text-white text-right mt-2 text-[rgba(0,0,0,0.85)] w-1/4">
                        {t("agentmanagement.merchant.collectionTime")}
                      </p>
                      <div className="flex flex-col gap-y-4 w-3/4">
                        {timeLimits && (
                          <div className="flex gap-x-4 w-full items-center">
                            <TimePicker
                              defaultValue={dayjs(
                                data.collection_time_from ?? "00:00",
                                "HH:mm"
                              )}
                              format={"HH:mm"}
                              onChange={(time, timeString) =>
                                changeHandler(
                                  "collection_time_from",
                                  timeString
                                )
                              }
                            />
                            <TimePicker
                              defaultValue={dayjs(
                                data.collection_time_to ?? "00:00",
                                "HH:mm"
                              )}
                              format={"HH:mm"}
                              // value={data?.collection_time_to}
                              onChange={(time, timeString) =>
                                changeHandler("collection_time_to", timeString)
                              }
                            />
                            <AiOutlineMinusCircle
                              className="cursor-pointer"
                              onClick={onClickRemoveTimeLimit}
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-x-4 w-full">
                          <Button
                            type="dashed"
                            className="gap-x-2 px-5 w-fit flex items-center dark:text-white"
                            onClick={() => setTimeLimits(true)}
                          >
                            <BsPlus />
                            {t("agentmanagement.merchant.addPaymentTimeLimit")}
                          </Button>
                          <p className="text-xs dark:text-white">
                            {t(
                              "agentmanagement.merchant.ifNotSet,TheDefaultIsUnlimited."
                            )}
                          </p>
                        </div>
                        {amountLimits && (
                          <div className="flex gap-x-4 w-full items-center">
                            <InputNumber
                              defaultValue={0}
                              onChange={(e) =>
                                changeHandler("receipt_amount_from", e)
                              }
                              value={data?.receipt_amount_from}
                            />
                            <InputNumber
                              defaultValue={0}
                              value={data?.receipt_amount_to}
                              onChange={(e) =>
                                changeHandler("receipt_amount_to", e)
                              }
                            />
                            <AiOutlineMinusCircle
                              className="cursor-pointer"
                              onClick={onClickRemoveAmountLimit}
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-x-4 w-full">
                          <Button
                            type="dashed"
                            className="gap-x-2 px-5 w-fit flex items-center dark:text-white"
                            onClick={() => setAmountLimits(true)}
                          >
                            {t(
                              "agentmanagement.merchant.addALimitOnTheAmountYouCanReceive"
                            )}
                          </Button>
                          <p className="text-xs dark:text-white">
                            {t(
                              "agentmanagement.merchant.ifNotSet,TheDefaultIsUnlimited."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.probability")}(%):
                        </span>
                      </p>
                      <InputNumber
                        defaultValue={0}
                        min={0}
                        max={100}
                        value={data?.probability}
                        onChange={(e) => changeHandler("probability", e)}
                      />
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.delayedCollection")}
                        </span>
                      </p>
                      <InputNumber
                        defaultValue={0}
                        value={data?.delayed_collection}
                        onChange={(e) => changeHandler("delayed_collection", e)}
                      />
                    </div>
                    {/* <div className="flex gap-x-2 items-center">
                      <p className="text-xs text-[#f04134] text-right w-1/4">
                        *{" "}
                        <span className="dark:text-white text-[rgba(0,0,0,0.85)]">
                          {t("agentmanagement.merchant.GPSMatchingMer")}
                        </span>
                      </p>
                      <Switch
                        defaultChecked
                        value={data?.gps_matching}
                        onChange={(e) =>
                          changeHandler(
                            "gps_matching",
                            e.target.checked ? "turn on" : "closure"
                          )
                        }
                      />
                    </div> */}
                  </div>
                  <div className="flex items-center justify-end dark:border-white">
                    <div className="pb-8 flex justify-end w-full">
                      <button
                        onClick={() => onClose(false)}
                        className="w-[75px] h-[28px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] border-[#8378788f] dark:border-white dark:text-white text-[12px] mx-2"
                      >
                        {t("agentmanagement.merchant.cancel")}
                      </button>
                      <button
                        className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={newGateClick()
                        }
                      // editGate
                      >
                        {name === "newGate"
                          ? t("agentmanagement.merchant.sure")
                          : t("agentmanagement.merchant.update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* label query */}
        <div>
          {name === "labelQuery" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center justify-between border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t(
                        "collectionManagement.bankCardManagement.tagManagement"
                      )}
                    </h2>
                    <div>
                      <button className="" onClick={() => onClose(false)}>
                        x
                      </button>
                    </div>
                  </div>
                  {/* Modal */}
                  <div className="py-5 px-6 flex flex-col gap-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-[rgba(0,0,0,0.85)] text-[15px] font-medium">
                          {t(
                            "collectionManagement.bankCardManagement.existingTags"
                          )}
                        </p>
                        <Button
                          className="text-xs py-0 text-[#eb6932] h-[22px] px-1.5 bg-white hover:!text-[#eb6932] border-[#eb6932] hover:!border-[#eb6932]"
                          type="dashed"
                        >
                          {t("collectionManagement.bankCardManagement.add")}
                        </Button>
                      </div>
                      <div className="mt-1 gap-x-2 flex">
                        {labels?.map((label) => (
                          <TagButton
                            name={label.caption}
                            bgColor={`${getLabelBg(label.color)}`}
                            color={`${getLabelColor(label.color)}`}
                            borderType={true}
                            onClickHandler={() => {
                              setRemoveTagId(label._id);
                              setNewTag({
                                ...newTag,
                                color: getLabelColor(label.color),
                                bg: getLabelBg(label.color),
                                default: false,
                              });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[rgba(0,0,0,0.85)] text-[15px] font-medium">
                        {t("collectionManagement.bankCardManagement.addedTags")}
                      </p>
                      <div className="mt-2 flex gap-x-3 items-center">
                        <input
                          type="text"
                          className="block w-[100px] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#d9d9d9] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#d9d9d9] text-xs"
                          placeholder={t(
                            "collectionManagement.bankCardManagement.labelName"
                          )}
                          value={newTag?.name}
                          onChange={(e) =>
                            setNewTag({
                              ...newTag,
                              name: e.target.value,
                            })
                          }
                        />
                        <NewTagButton />
                        {newTag?.name && (
                          <TagButton
                            name={t(
                              "collectionManagement.bankCardManagement.addDefault"
                            )}
                            width="w-[90px]"
                            bgColor="bg-white"
                            color="text-[rgba(0,0,0,0.65)]"
                            onClickHandler={() => {
                              setNewTag({
                                ...newTag,
                                default: !newTag?.default,
                              });
                            }}
                          />
                        )}
                        {removeTagId && (
                          <TagButton
                            name={t("collectionManagement.bankCardManagement.deleteLabel")}
                            width="w-[90px]"
                            bgColor="bg-[#d9d9d9]"
                            color="text-[#f04134]"
                            onClickHandler={() => {
                              onClickHandlers?.removeLabel(removeTagId);
                            }}
                          />
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-x-2">
                        {colorPallet.map((pallet, key) => (
                          <ColorButton
                            name={pallet.label}
                            key={key}
                            bgColor={getLabelBg(pallet.name)}
                            color={getLabelColor(pallet.name)}
                            onClickHandler={() => {
                              setNewTag({
                                ...newTag,
                                color: getLabelColor(pallet.name),
                                bg: getLabelBg(pallet.name),
                                caption: pallet.name,
                                default: false,
                              });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end dark:border-white">
                    <div className="pb-8 flex justify-center w-full">
                      <button
                        className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={() => {
                          onClickHandlers?.addLabel(newTag);
                        }}
                      >
                        {t("collectionManagement.bankCardManagement.confirm")}
                      </button>
                      <button
                        className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={() => {
                          setNewTag({
                            name: "",
                            color: "",
                            bg: "",
                            default: false,
                          });
                          setRemoveTagId("");
                        }}
                      >
                        {t("collectionManagement.bankCardManagement.reset")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "addPayment" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      {t(
                        "agentmanagement.merchant.modifyChannelSettingsInBatches"
                      )}
                    </h2>
                  </div>
                  {/* Modal */}
                  <div className="p-5 flex flex-col gap-y-4">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        Name:
                      </p>
                      <Input
                        placeholder="please enter a name"
                        className="border !border-[#d9d9d9] rounded-md text-xs w-3/4"
                        value={data?.name}
                        onChange={(e) => changeHandler("name", e.target.value)}
                      />
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        the car:
                      </p>
                      <Select
                        placeholder="please enter the car name"
                        className="text-[#231e22] w-3/4"
                        onChange={(e) => changeHandler("type", e)}
                        value={data?.type}
                      >
                        <Select.Option value="default" className="!text-xs">
                          default
                        </Select.Option>
                      </Select>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        Payment type:
                      </p>
                      <Select
                        placeholder="Select payment type"
                        className="text-[#231e22] w-3/4"
                        onChange={(e) => changeHandler("paymentType", e)}
                        value={data?.paymentType}
                      >
                        <Select.Option value="default">
                          Vietname card to card
                        </Select.Option>
                        <Select.Option value="zalo">
                          Vietname ZALO
                        </Select.Option>
                        <Select.Option value="momo">
                          Vietname MOMO
                        </Select.Option>
                        <Select.Option value="direct">
                          Vietname Direct
                        </Select.Option>
                        <Select.Option value="viettel">
                          Vietname ViettelPay
                        </Select.Option>
                        <Select.Option value="behalf">
                          Pay on behalf
                        </Select.Option>
                      </Select>
                    </div>
                    {(data?.paymentType === "default" ||
                      data?.paymentType === "direct") && (
                        <div className="flex gap-x-2 items-center">
                          <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                            Choose bank:
                          </p>
                          <Select
                            placeholder="Please select a bank"
                            className="text-[#231e22] w-3/4"
                            onChange={(e) => changeHandler("bank", e)}
                            value={data?.bank}
                          >
                            <Select.Option value="ACB" >
                              <div className="flex justify-between">
                                <img src={Img_ABB} alt="Img_ACB" className="inline-block h-[25px]" /> ACB
                              </div>
                            </Select.Option>
                            <Select.Option value="VTB">
                              <div className="flex justify-between">
                                <img src={Img_VTB} alt="Img_VTB" className="inline-block h-[25px]" /> Vietcombank
                              </div>
                            </Select.Option>
                            <Select.Option value="BIDV">
                              <div className="flex justify-between">
                                <img src={Img_BIDV} alt="Img_BIDV" className="inline-block h-[25px]" /> BIDV
                              </div>
                            </Select.Option>
                            <Select.Option value="Vietinbank">
                              <div className="flex justify-between">
                                <img src={Img_VTB} alt="Img_VTB" className="inline-block h-[25px]" /> Vietinbank
                              </div>
                            </Select.Option>
                            <Select.Option value="Techcombank">
                              <div className="flex justify-between">
                                <img src={Img_TCB} alt="Img_TCB" className="inline-block h-[25px]" /> Techcombank
                              </div>
                            </Select.Option>
                            <Select.Option value="Sacombank">
                              <div className="flex justify-between">
                                <img src={Img_STB} alt="Img_STB" className="inline-block h-[25px]" /> Sacombank
                              </div>
                            </Select.Option>
                            <Select.Option value="MBBank">
                              <div className="flex justify-between">
                                <img src={Img_MBBank} alt="Img_MBBank" className="inline-block h-[25px]" /> MBBank
                              </div>
                            </Select.Option>
                            <Select.Option value="VPBank">
                              <div className="flex justify-between">
                                <img src={Img_VPB} alt="Img_VPB" className="inline-block h-[25px]" /> VPBank
                              </div>
                            </Select.Option>
                            <Select.Option value="Agribank">
                              <div className="flex justify-between">
                                <img src={Img_AGB} alt="Img_AGB" className="inline-block h-[25px]" /> Agribank
                              </div>
                            </Select.Option>
                            <Select.Option value="TPBank">
                              <div className="flex justify-between">
                                <img src={Img_TPB} alt="Img_TPB" className="inline-block h-[25px]" /> TPBank
                              </div>
                            </Select.Option>
                            <Select.Option value="DongA Bank">
                              <div className="flex justify-between">
                                <img src={Img_VTB} alt="Img_VTB" className="inline-block h-[25px]" /> Vietinbank
                              </div>
                            </Select.Option>
                            <Select.Option value="Eximbank">
                              <div className="flex justify-between">
                                <img src={Img_EXIM} alt="Img_EXIM" className="inline-block h-[25px]" /> Eximbank
                              </div>
                            </Select.Option>
                            <Select.Option value="ABBank">
                              <div className="flex justify-between">
                                <img src={Img_ABB} alt="Img_ABB" className="inline-block h-[25px]" /> ABBank
                              </div>
                            </Select.Option>
                            <Select.Option value="Viet Capital">
                              <div className="flex justify-between">
                                <img src={Img_VCB} alt="Img_VCB" className="inline-block h-[25px]" /> Viet Capital
                              </div>
                            </Select.Option>
                            <Select.Option value="OCB">
                              <div className="flex justify-between">
                                <img src={Img_OCB} alt="Img_OCB" className="inline-block h-[25px]" /> OCB
                              </div>
                            </Select.Option>
                            <Select.Option value="VIB">
                              <div className="flex justify-between">
                                <img src={Img_VIB} alt="Img_VIB" className="inline-block h-[25px]" /> VIB
                              </div>
                            </Select.Option>
                          </Select>
                        </div>
                      )}
                    {(data?.paymentType === "default" ||
                      data?.paymentType === "direct" ||
                      data?.paymentType === "momo" ||
                      data?.paymentType === "viettel") && (
                        <div className="flex gap-x-2 items-center">
                          <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                            Phone number:
                          </p>
                          <Input
                            placeholder="please enter phone number"
                            className="border !border-[#d9d9d9] rounded-md text-xs w-3/4"
                            value={data?.phoneNumber}
                            onChange={(e) =>
                              changeHandler("phoneNumber", e.target.value)
                            }
                          />
                        </div>
                      )}
                    {(data?.paymentType === "default" ||
                      data?.paymentType === "direct" ||
                      data?.paymentType === "zalo") && (
                        <div className="flex gap-x-2 items-center">
                          <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                            {data?.paymentType === "zalo"
                              ? "Zalo Account:"
                              : "Bank Account:"}
                          </p>
                          <Input
                            placeholder={`please enter ${data?.paymentType === "zalo" ? "zalo" : "bank"
                              } account number`}
                            className="border !border-[#d9d9d9] rounded-md text-xs w-3/4"
                            value={data?.accountNumber}
                            onChange={(e) =>
                              changeHandler("accountNumber", e.target.value)
                            }
                          />
                        </div>
                      )}
                  </div>

                  <div className="flex items-center justify-end dark:border-white">
                    <div className="pb-8 flex justify-center w-full">
                      <button
                        className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={() => {
                          onClickHandlers?.addPayment();
                          onClose(false);
                        }}
                      >
                        {t("agentmanagement.merchant.sure")}
                      </button>
                      <button
                        onClick={() => onClose(false)}
                        className="w-[75px] h-[28px] border-solid border-[0.75px] border-themeBorder1 rounded-[3px] border-[#8378788f] dark:border-white dark:text-white text-[12px] mx-2"
                      >
                        {t("agentmanagement.merchant.cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "newBook" && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity bg-[#3737379A]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-transparent opacity-75"></div>
                </div>
                <div
                  className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[520px] sm:w-full"
                  ref={modalRef}
                >
                  <div className="h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                    <h2 className="text-[14px] dark:text-white">
                      Add withdrawal record
                    </h2>
                  </div>
                  {/* Modal */}
                  <div className="p-5 flex flex-col gap-y-4">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        Choose payment card:
                      </p>
                      <Select
                        placeholder="Choose payment card"
                        className="text-[#231e22] w-3/4 text-xs"
                      >
                        <Select.Option value="BUI" className="!text-xs">
                          BUI VAN HIEN VCB 5610 0061 0947
                        </Select.Option>
                        <Select.Option value="THEDOG" className="!text-xs">
                          THE DOG VAN TCB 3034 6879 79
                        </Select.Option>
                        <Select.Option value="NGUYEN" className="!text-xs">
                          NGUYEN NGOC TU BIDV 4551 0002 7843 32
                        </Select.Option>
                        <Select.Option value="VCB" className="!text-xs">
                          VCB 1033 9586 01
                        </Select.Option>
                        <Select.Option value="LE" className="!text-xs">
                          LE TRUNG HIEU TCB 1905 0013 8940 17
                        </Select.Option>
                      </Select>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        Withdrawal amount:
                      </p>
                      <InputNumber placeholder="Please enter the withdrawal amount" className="w-3/4 text-xs" />
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-xs dark:text-white text-[rgba(0,0,0,0.85)] w-1/4 text-right">
                        handling fee:
                      </p>
                      <InputNumber placeholder="Please enter the handling fee" className="w-3/4 text-xs" />
                    </div>
                  </div>
                  <div className="flex items-center justify-end dark:border-white">
                    <div className="pb-8 flex justify-center w-full">
                      <button
                        className="w-[75px] h-[28px] bg-primary dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-white text-[12px] mx-2 border-[#eb6932]"
                        onClick={() => onClose()}
                      >
                        Sure
                      </button>
                      <button
                        className="w-[75px] h-[28px] bg-white text-[rgba(0,0,0,0.65) dark:bg-transparent border-solid border-[0.75px] border-themeBorder1 rounded-[3px] text-[12px] mx-2 border-[#eb6932]"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Notification ref={modalRef} />
    </div>
  );

};

export default MerchantModal;
