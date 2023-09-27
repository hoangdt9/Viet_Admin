import React, { useEffect, useState } from "react";
import { BsBagPlus, BsRocketFill } from "react-icons/bs";
import { BsBoxArrowDown } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import tempImage from "../../assets/images/paygate/vietnamBankScanCode.png";
import MerchantModal from "../agent_management/merchantModal";
import { OrangeButton } from "../../components/ui/button/AgentManagement";
import {
  setSuccess,
  getLabelsData,
  addNewLabel,
  removeLabel,
  getCollectionCards,
  addCollectionCard,
  modifyCollectionCard,
  changeCardState,
  changeCardClassification,
  changeCardCrawlerStatus,
  deleteCardCollection,
  initSuccess,
} from "../../redux/collectionReducer";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputNumber, Select, Popover, Upload, message, Switch, Button } from "antd";
import { useNavigate } from "react-router-dom";
import groupListService from "../../services/permission/groupListService";
import { saveRestrictMerchants } from "../../services/collection/bankCard";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { setAlarm } from "../../services/collection/alarm";
import { socket } from "../../config/constants";

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

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("labelQuery");
  const [cardType, setCardType] = useState([]);
  const dispatch = useDispatch();
  const { labels, success, collections } = useSelector((state) => state.collectionState);
  const { allMerchants } = useSelector(state => state.permissionState);
  const [newPayment, setNewPayment] = useState({});
  const [classification, setClassification] = useState("all");
  const [isEdit, setEdit] = useState(false);
  const [editColumn, setEditColumn] = useState({});
  const [open, setOpen] = useState(-1);
  const [mrtOpen, setMrtOpen] = useState(-1);
  const [qrOpen, setQrOpen] = useState(-1);
  const [alarmOpen, setAlarmOpen] = useState(-1);
  const [retMerchants, setRetMerchants] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [bankBalance, setBankBalance] = useState(0);
  const [deviceId, setDeviceId] = useState('0')

  console.log("collections:", collections);

  const ImgObj = {
    "Techcombank": Img_TCB
  }

  useEffect(() => {
    socket.on('balanceOfBankToSite', (bankInfo) => {
      setBankBalance(bankInfo.balance);
      setDeviceId(bankInfo.device_id);
    })
  }, []);

  const onClickCardType = (card) => {
    const updatedCardType = cardType.includes(card)
      ? cardType.filter((c) => c !== card)
      : [...cardType, card];
    setCardType(updatedCardType);
  };

  const onClickLabelQuery = () => {
    setModalName("labelQuery");
    setIsOpenModal(true);
  };

  const hide = () => {
    setOpen(-1);
  };

  const handleOpenChange = (key) => {
    if (open !== key) {
      setOpen(key);
    } else hide();
  };

  const mrtHide = () => {
    setMrtOpen(-1);
  };

  const mrtHandleOpenChange = (key) => {
    if (mrtOpen !== key) {
      setMrtOpen(key);
    } else mrtHide();
  };

  const alarmHide = () => {
    setAlarmOpen(-1);
  };

  const alarmHandleOpenChange = (key) => {
    if (alarmOpen !== key) {
      setAlarmOpen(key);
    } else alarmHide();
  };

  const qrHide = () => {
    setQrOpen(-1);
  };

  const mrtQrOpenChange = (key) => {
    if (qrOpen !== key) {
      setQrOpen(key);
    } else qrHide();
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const popUpContent = () => (
    <div className="py-1 px-4 flex flex-col gap-y-1">
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">type&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">&nbsp;{`${collections[open]?.type}`}</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">phone&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">"0866439182"</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">accountNumber&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">{`${collections[open]?.accountNumber}`}</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">realBankBalance &nbsp;:&nbsp;</p>
        <p className="text-[#009688] text-xs">108450</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#b938a4] text-xs">isAllBanks  &nbsp;:&nbsp;</p>
        <p className="text-[#009688] text-xs">true</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">bankUsername&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">"2698080182"</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">otp&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">"5588"</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">showName&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs">{`${collections[open]?.name}`}</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">isAutoClawling&nbsp;:&nbsp;</p>
        <p className="text-[#b938a4] text-xs">false</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#4E187C] text-xs">allowMerchantSets&nbsp;:&nbsp;</p>
        <p className="text-[#FF6B6B] text-xs"></p>
      </div>
    </div>
  )

  const AlarmPopOver = (isActive, value, id) => {
    const [isChecked, setChecked] = useState(isActive);
    const [balance, setBalance] = useState(value);
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-center gap-x-1 items-center full">
          <Switch checked={isChecked} onChange={(e) => setChecked(e)} className="bg-[rgba(0,0,0,0.25)] text-xs" />
          <InputNumber className="flex-1 min-w-[180px] text-xs" value={balance} onChange={(e) => setBalance(e)} />
        </div>
        {
          isChecked && (
            <div className="w-full text-xs">
              more than the {balance} yuan alarm
            </div>
          )
        }
        <Button onClick={() => onClickAlarmHandler(id, isChecked, balance)} className="w-fit text-xs">confirm</Button>
      </div>
    )
  }

  const onClickAlarmHandler = async (id, isActive, balance) => {
    const res = await setAlarm(id, isActive, balance);
    if(res.success)
      alarmHide();
  }

  const onClickKeepHandler = async () => {
    await saveRestrictMerchants(collections[mrtOpen]._id, retMerchants);
  }

  const popUpMerchant = () => (
    <div className="py-1 flex gap-x-2">
    <Select className="flex-1 min-w-[160px]" mode="multiple" value={retMerchants} onChange={(e) => setRetMerchants(e)}>
      {
        allMerchants?.map((merchant, key) => (
          <Select.Option value={merchant?._id} key={key}>
            {merchant?.name}
          </Select.Option>
        ))
      }
    </Select>
    <OrangeButton label="keep" onClickHandler={onClickKeepHandler} />
  </div>
  )
  
  const popUpQr = () => (
    <div className="py-1 flex gap-x-2">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  
  async function myFunc() {
    await dispatch(getLabelsData());
    await dispatch(getCollectionCards("BankCard"));
    dispatch(setSuccess(false));
  }

  async function myFunc1() {
    if (classification !== "all")
      await dispatch(changeCardClassification("BankCard", classification));
    else dispatch(initSuccess(true));
  }

  useEffect(() => {
    dispatch(groupListService.getMerchants());
  }, [])

  useEffect(() => {
    if (success) {
      myFunc();
    }
  }, [success]);

  useEffect(() => {
    myFunc1();
  }, [classification]);

  const onClickDeleteLabelHandler = (id) => {
    dispatch(removeLabel(id));
  };

  const onClickAddLabelHandler = (label) => {
    const temp = {
      caption: label?.name,
      color: label?.caption,
    };
    dispatch(addNewLabel(temp));
  };

  const onClickNewPaymentHandler = () => {
    setModalName("addPayment");
    setNewPayment({});
    setIsOpenModal(true);
  };

  const onClickAddNewPayment = () => {
    dispatch(addCollectionCard(newPayment, "BankCard"));
  };

  const onChangeState = (id, state) => {
    dispatch(changeCardState(id, state === "closure" ? "turn on" : "closure"));
  };

  const onChangeCrawlerStatus = (id, crawlerStatus) => {
    dispatch(
      changeCardCrawlerStatus(
        id,
        crawlerStatus === "closure" ? "turn on" : "closure"
      )
    );
  };

  const onClickDeleteCollection = (id) => {
    if (isEdit) {
      setEditColumn({});
      setEdit(false);
    } else {
      dispatch(deleteCardCollection(id));
    }
  };

  const onChangeEditColumn = (name, value) => {
    setEditColumn({
      ...editColumn,
      [name]: value,
    });
  };

  const onClickEditHandler = (collection) => {
    console.log("edit", collection);
    if (isEdit) {
      dispatch(
        modifyCollectionCard({
          ...editColumn,
          id: editColumn._id,
        })
      );
    } else {
      setEditColumn(collection);
    }
    setEdit(!isEdit);
  };

  const onClickInitiateRolloverHandler = (row) => {
    navigate(`/rollover/${row._id}`);
  };

  const onClickNewBookHandler = () => {
    setModalName("newBook");
    setIsOpenModal(true);
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-sm dark:text-white">
          {t("collectionManagement.bankCardManagement.collectionNumberList")}
        </h1>
      </div>
      <div className="flex items-center mt-2 dark:text-white">
        <div className="">
          <label className="text-xs">
            {t("collectionManagement.bankCardManagement.monitorInquiry")}:
          </label>
          <Select
            placeholder={t(
              "collectionManagement.bankCardManagement.monitorInquiry"
            )}
            className="ml-2"
          >
            <Select.Option value="defaultmonitor">
              {t("collectionManagement.bankCardManagement.defaultMonitor")}
            </Select.Option>
          </Select>
          <label className="text-xs ml-5">
            {t("collectionManagement.bankCardManagement.accountQuery")}:
          </label>
          <input
            type="text"
            className="ml-2 p-[3px_3px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          />
          <label className="text-xs ml-5">
            {t("collectionManagement.bankCardManagement.statusQuery")}:
          </label>
          <select
            placeholder={"Choose payment card"}
            id="mySelect"
            name="mySelect"
            className="ml-2 p-[3px_10px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          >
            <option></option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 3</option>
            <option>Option 3</option>
          </select>
          <label className="text-xs ml-5">
            {t("collectionManagement.bankCardManagement.statisticalDate")}:
          </label>
          <input
            type="date"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          />
          <label className="text-xs">~</label>
          <input
            type="date"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          />
          <button className="p-[5px_15px] ml-6 text-xs bg-primary text-white dark:bg-grey-dark border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
            {t("collectionManagement.bankCardManagement.inquire")}
          </button>
        </div>
      </div>
      <div className="mt-2">
        <button className="p-[5px_15px] text-xs bg-primary text-white dark:bg-grey-dark border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
          {t("collectionManagement.bankCardManagement.inquire")}
        </button>
        <button
          className="text-xs text-primary ml-1 underline"
          onClick={onClickLabelQuery}
        >
          {t("collectionManagement.bankCardManagement.labelQuery")}:
        </button>
        <button
          onClick={() => onClickCardType("ACB")}
          className="text-xs ml-2 bg-lightYellow text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("ACB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          ACB
        </button>
        <button
          onClick={() => onClickCardType("BIDV")}
          className="text-xs ml-2 bg-lightBlue text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("BIDV") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          BIDV
        </button>
        <button
          onClick={() => onClickCardType("TCB")}
          className="text-xs ml-2 bg-lightRed text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("TCB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          TCB
        </button>
        <button
          onClick={() => onClickCardType("VCB")}
          className="text-xs ml-2 bg-lightGreen text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("VCB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          VCB
        </button>
        <button
          onClick={() => onClickCardType("VTB")}
          className="text-xs ml-2 bg-lightPurple text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("VTB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          VTB
        </button>
        <button
          onClick={() => onClickCardType("STB")}
          className="text-xs ml-2 bg-heavyYellow text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("STB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          STB
        </button>
        <button
          onClick={() => onClickCardType("MB")}
          className="text-xs ml-2 bg-customPurple text-grey-dark border border-white p-[3px_10px] rounded-md text-white"
          style={{
            clipPath:
              cardType.indexOf("MB") !== -1
                ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 0%)"
                : "none",
          }}
        >
          MB
        </button>
      </div>
      <div className="mt-2">
        <label htmlFor="">
          {t("collectionManagement.bankCardManagement.classification")}:
        </label>
        <button
          className={`p-[5px_15px] ml-2 text-xs bg-white text-[#666666] hover:text-white border border-grayCustom rounded cursor-pointer duration-300 hover:bg-[rgb(30,159,255)] ${
            classification === "normal" && "!bg-[rgb(30,159,255)] !text-white"
          }
          `}
          onClick={() => setClassification("normal")}
        >
          {t("collectionManagement.bankCardManagement.normal")}
        </button>
        <button
          className={`p-[5px_15px] text-xs bg-white text-[#666666] hover:text-white border border-grayCustom rounded cursor-pointer duration-300 hover:bg-[rgb(30,159,255)] ${
            classification === "abnormal" && "!bg-[rgb(30,159,255)] !text-white"
          }`}
          onClick={() => setClassification("abnormal")}
        >
          {t("collectionManagement.bankCardManagement.abnormal")}
        </button>
        <button
          className={`p-[5px_15px] text-xs bg-white text-[#666666] hover:text-white border border-grayCustom rounded cursor-pointer duration-300 hover:bg-[rgb(30,159,255)] ${
            classification === "all" && "!bg-[rgb(30,159,255)] !text-white"
          }`}
          onClick={() => setClassification("all")}
        >
          {t("collectionManagement.bankCardManagement.all")}
        </button>
        <button className="w-fit px-4 py-1.5 rounded-[4px] cursor-pointer text-white font-medium text-center whitespace-nowrap text-xs border dark:border-primary bg-primary hover:bg-primary-dark duration-300 dark:bg-[#3e3c3b] dark:hover:bg-[#4d465e] border-transparent">
          {t("collectionManagement.bankCardManagement.statisticalMonth")}
        </button>
        <button className="w-fit ml-1 px-4 py-1.5 rounded-[4px] cursor-pointer text-white font-medium text-center whitespace-nowrap text-xs border dark:border-primary bg-primary hover:bg-primary-dark duration-300 dark:bg-[#3e3c3b] dark:hover:bg-[#4d465e] border-transparent">
          {t("collectionManagement.bankCardManagement.statisticsDay")}
        </button>
      </div>
      <div className="mt-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <button
            className="p-[5px_15px] text-xs text-[rgba(0,0,0,0.25)] bg-[#f7f7f7] border border-[rgba(0,0,0,0.25)] rounded cursor-pointer duration-300"
            disabled
          >
            {t("collectionManagement.bankCardManagement.batchOperation")}
          </button>
          <div className="ml-5">
            <input
              type="checkbox"
              className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
              placeholder="Enter the operation content"
            />
            <label htmlFor="" className="text-lg dark:text-white pl-1">
              {t(
                "collectionManagement.bankCardManagement.globalSubscriptionMessage"
              )}
            </label>
          </div>
          <div className="ml-5">
            <input
              type="checkbox"
              className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
              placeholder="Enter the operation content"
            />
            <label htmlFor="" className="text-lg dark:text-white pl-1">
              {t("collectionManagement.bankCardManagement.liteList")}
            </label>
          </div>
          <div className="ml-5">
            <input
              type="checkbox"
              className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
              placeholder="Enter the operation content"
            />
            <label htmlFor="" className="text-lg dark:text-white pl-1">
              {t("collectionManagement.bankCardManagement.showReconciliation")}
            </label>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <OrangeButton
            label={t(
              "collectionManagement.bankCardManagement.turnOnAutoRefresh"
            )}
          />
          <OrangeButton
            label={t(
              "collectionManagement.bankCardManagement.addAPaymentNumber"
            )}
            onClickHandler={onClickNewPaymentHandler}
          />
        </div>
      </div>
      <div className="mt-5 min-w-full">
        <table className="w-full text-sm  ">
          <thead>
            <tr className="bg-[#dfdfdf] text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white">
              <td className="p-[10px_8px]">
                <div className="ml-5">
                  <input
                    type="checkbox"
                    className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
                    placeholder="Enter the operation content"
                  />
                  <label htmlFor="" className="text-xs dark:text-white pl-1">
                    {t("collectionManagement.bankCardManagement.serialNumber")}
                  </label>
                </div>
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.bankCardManagement.name")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.bankCardManagement.information")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.bankCardManagement.state")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.bankCardManagement.note")}
              </td>
            </tr>
          </thead>
          <tbody>
            {collections?.map((collection, key) => (
              <tr className=" hover:bg-[#fdf4ec] dark:hover:bg-grey-dark text-grey-dark dark:text-white border-[#eb6932] duration-300 border-b-[4px] text-xs">
                <td className="p-[12px_8px] bg-[#ffe6d9] dark:bg-transparent hover:bg-[#fdf4ec]">
                  <div className="ml-5">
                    <input
                      type="checkbox"
                      className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
                      placeholder="Enter the operation content"
                    />
                    <label htmlFor="" className="text-xs dark:text-white pl-1">
                      {key + 1}
                    </label>
                  </div>
                </td>
                <td className="p-[12px_8px] min-w-[300px]">
                  <div className="">
                    <label htmlFor="" className="text-xs dark:text-white">
                      {t("collectionManagement.bankCardManagement.name")}:
                    </label>
                    <button className="ml-1 text-primary">
                      # <span className="text-lg">12</span>{" "}
                      {isEdit && editColumn._id === collection._id ? (
                        <Input
                          value={editColumn?.name}
                          className="border !border-[#d9d9d9] rounded-md text-xs"
                          onChange={(e) =>
                            onChangeEditColumn("name", e.target.value)
                          }
                        />
                      ) : (
                        collection?.name
                      )}
                    </button>
                  </div>
                  <div className="flex flex-row items-end">
                    <label htmlFor="" className="mr-1 text-xs dark:text-white">
                      {t("collectionManagement.bankCardManagement.type")}:
                    </label>
                    <img
                      src={ImgObj[collection.bank]}
                      alt="temp"
                      width={50}
                      height={0}
                      className=""
                    />
                  </div>
                  <div className="h-16 relative mt-2 bg-[#ffe6d9] dark:bg-transparent">
                    <button className="absolute bg-white top-1/2 left-[5%] -translate-y-3 border text-[rgba(0,0,0,0.65)] border-[rgba(0,0,0,0.65)] border-dashed p-[4px_6px] rounded-md">
                      <BsPlus />
                    </button>
                  </div>
                </td>
                <td className="p-[12px_8px]">
                  <div className="flex flex-row">
                    <div className="">
                      <p>
                        {t("collectionManagement.bankCardManagement.monitor")}:
                        <span></span>
                      </p>
                      <p>
                        {t("collectionManagement.bankCardManagement.device")}{" "}
                        ID:{" "}
                        <span>
                          {isEdit && editColumn._id === collection._id ? (
                            <Input
                              value={editColumn?.deviceID}
                              className="border !border-[#d9d9d9] rounded-md text-xs"
                              onChange={(e) =>
                                onChangeEditColumn("deviceID", e.target.value)
                              }
                            />
                          ) : (
                            deviceId
                          )}
                        </span>
                      </p>
                      <p>
                        {t(
                          "collectionManagement.bankCardManagement.ordinalValue"
                        )}
                        :
                        <span>
                          {isEdit && editColumn._id === collection._id ? (
                            <Input
                              value={editColumn?.ordinalValue}
                              className="border !border-[#d9d9d9] rounded-md text-xs"
                              onChange={(e) =>
                                onChangeEditColumn(
                                  "ordinalValue",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            collection?.ordinalValue
                          )}
                        </span>
                      </p>
                      <p>
                        {t(
                          "collectionManagement.bankCardManagement.dailyReceivingLimit"
                        )}
                        :
                        <span className="text-lightBlue text-lg ml-2">
                          {isEdit && editColumn._id === collection._id ? (
                            <InputNumber
                              value={editColumn?.dailyReceivingLimit}
                              className="border !border-[#d9d9d9] rounded-md text-xs"
                              onChange={(e) =>
                                onChangeEditColumn("dailyReceivingLimit", e)
                              }
                            />
                          ) : (
                            collection?.dailyReceivingLimit
                          )}
                          {t(
                            "collectionManagement.bankCardManagement.billionYuan"
                          )}
                        </span>
                      </p>
                      <p>
                        {t(
                          "collectionManagement.bankCardManagement.dailyMaximumNumberOfPaymentsReceived"
                        )}
                        :
                        <span className="text-lg ml-2">
                          {isEdit && editColumn._id === collection._id ? (
                            <InputNumber
                              value={editColumn?.dailyMaxPayment}
                              className="border !border-[#d9d9d9] rounded-md text-xs"
                              onChange={(e) =>
                                onChangeEditColumn("dailyMaxPayment", e)
                              }
                            />
                          ) : (
                            collection?.dailyMaxPayment
                          )}{" "}
                          {t("collectionManagement.bankCardManagement.pens")}
                        </span>
                      </p>
                    </div>
                    <div className="ml-8">
                      <div className="flex flex-row">
                        <label htmlFor="">
                          {t("collectionManagement.bankCardManagement.state")}:
                        </label>
                        {isEdit && editColumn._id === collection._id ? (
                          <Select defaultValue={collection?.state}>
                            <Select.Option value="turn on">
                              {t(
                                "collectionManagement.bankCardManagement.turnOn"
                              )}
                            </Select.Option>
                            <Select.Option value="closure">
                              {t(
                                "collectionManagement.bankCardManagement.closure"
                              )}
                            </Select.Option>
                          </Select>
                        ) : (
                          <button
                            className={`ml-2 border border-grey p-[3px_9px] rounded-md ${
                              collection?.state === "turn on"
                                ? "text-[#00a854] bg-[#cfefdf]"
                                : "text-[#f04134] bg-[#fcdbd9]"
                            }`}
                            onClick={() =>
                              onChangeState(collection?._id, collection?.state)
                            }
                          >
                            {collection?.state === "turn on"
                              ? t(
                                  "collectionManagement.bankCardManagement.turnOn"
                                )
                              : t(
                                  "collectionManagement.bankCardManagement.closure"
                                )}
                          </button>
                        )}
                        {isEdit && editColumn._id === collection._id ? (
                          <Select defaultValue={collection?.classification}>
                            <Select.Option value="normal">
                              {t(
                                "collectionManagement.bankCardManagement.normal"
                              )}
                            </Select.Option>
                            <Select.Option value="abnormal">
                              {t(
                                "collectionManagement.bankCardManagement.abnormal"
                              )}
                            </Select.Option>
                            <Select.Option value="all">
                              {t("collectionManagement.bankCardManagement.all")}
                            </Select.Option>
                          </Select>
                        ) : (
                          <button className="ml-2 bg-[#f3f3f3] text-[rgba(0,0,0,.65)] border border-grey p-[3px_9px] rounded-md">
                            {collection?.classification === "normal"
                              ? t(
                                  "collectionManagement.bankCardManagement.normal"
                                )
                              : collection?.classification === "abnormal"
                              ? t(
                                  "collectionManagement.bankCardManagement.abnormal"
                                )
                              : t(
                                  "collectionManagement.bankCardManagement.all"
                                )}
                          </button>
                        )}
                      </div>
                      {isEdit && editColumn._id === collection._id ? (
                        <InputNumber
                          value={editColumn?.weights}
                          onChange={(e) => onChangeEditColumn("weights", e)}
                        />
                      ) : (
                        <p className="">
                          {t("collectionManagement.bankCardManagement.weights")}
                          : <span className="ml-2">{collection?.weights}</span>
                        </p>
                      )}
                      {/* <button className="text-primary underline mt-1">
                        {t(
                          "collectionManagement.bankCardManagement.riskControlSettings"
                        )}
                      </button> */}
                      <p className="mt-1">
                        {t(
                          "collectionManagement.bankCardManagement.receiptAmountRange"
                        )}
                        :{" "}
                        <span className="ml-2 ">
                          0~
                          {collection?.receipt_limit
                            ? "Limited"
                            : t(
                                "collectionManagement.bankCardManagement.noLimit"
                              )}
                        </span>
                      </p>
                      <div className="mt-1">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.crawlerStatus"
                          )}
                          :
                        </label>
                        <button
                          className={`ml-2 border border-grey p-[3px_9px] rounded-md ${
                            collection?.crawlerStatus === "turn on"
                              ? "text-[#00a854] bg-[#cfefdf]"
                              : "text-[#f04134] bg-[#fcdbd9]"
                          }`}
                          onClick={() =>
                            onChangeCrawlerStatus(
                              collection._id,
                              collection.crawlerStatus
                            )
                          }
                        >
                          {collection?.crawlerStatus === "turn on"
                            ? t(
                                "collectionManagement.bankCardManagement.turnOn"
                              )
                            : t(
                                "collectionManagement.bankCardManagement.closure"
                              )}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-[12px_8px]">
                  <div className="flex flex-row">
                    <div className="">
                      <div className="">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.paymentOnTheDay"
                          )}
                          :
                        </label>
                        <label htmlFor="" className="ml-4 text-primary text-lg">
                          77,060,000
                        </label>
                      </div>
                      <div className="">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.bankRealTimeBalance"
                          )}
                          :
                        </label>
                        <label htmlFor="" className="ml-4 text-primary text-lg">
                          {bankBalance}
                        </label>
                        <Popover
                          content={() => AlarmPopOver(collection?.alarmStatus, collection.alarmStdValue ?? 0, collection._id)}
                          title={
                            <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                              <p>Balance Alert Settings</p>
                            </div>
                          }
                          trigger="click"
                          open={alarmOpen === key}
                          onOpenChange={() => alarmHandleOpenChange(key)}
                        >
                          <button className="ml-2 bg-[#f3f3f3] text-[rgba(0,0,0,.65)] border border-grey p-[3px_9px] rounded-md">
                            {t("collectionManagement.bankCardManagement.alarm")}
                          </button>
                        </Popover>
                      </div>
                      <div className="">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.accountDifference"
                          )}
                          :
                        </label>
                        <label htmlFor="" className="ml-4 text-primary text-lg">
                          -77,060,000
                        </label>
                      </div>
                      <div className="">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.todaySuccessRate"
                          )}
                          :
                        </label>
                        <label htmlFor="" className="ml-4 text-primary text-lg">
                          100.00%
                        </label>
                      </div>
                      <div className="">
                        <label htmlFor="">
                          {t(
                            "collectionManagement.bankCardManagement.todaySuccessRate2"
                          )}
                          :
                        </label>
                        <label htmlFor="" className="ml-4 text-primary text-lg">
                          92.16%
                        </label>
                      </div>
                    </div>
                    <div className="ml-10">
                      <button
                        className="underline text-sm mb-2 text-primary block"
                        onClick={() =>
                          onClickInitiateRolloverHandler(collection)
                        }
                      >
                        {t(
                          "collectionManagement.bankCardManagement.initiateRollover"
                        )}
                      </button>
                      <button className="underline text-sm mb-2 text-primary block" onClick={onClickNewBookHandler}>
                        {t(
                          "collectionManagement.bankCardManagement.newBookKeeping"
                        )}
                      </button>
                      <button className="underline text-sm mb-2 text-primary block" onClick={() => navigate("/order-list")}>
                        {t(
                          "collectionManagement.bankCardManagement.checkOrder"
                        )}
                      </button>
                      <button className="underline text-sm mb-2 text-primary block">
                      <Popover
                        content={popUpContent}
                        title={
                          <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                            <p>Number information</p>
                            <OrangeButton label="Revise" />
                          </div>
                        }
                        trigger="click"
                        open={open === key}
                        onOpenChange={() => handleOpenChange(key)}
                      >
                        {t(
                          "collectionManagement.bankCardManagement.numberInformation"
                        )}
                        </Popover>
                      </button>
                      <button className="underline text-sm mb-2 text-primary block">
                      <Popover
                        content={popUpMerchant}
                        placement="left"
                        title={
                          <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                            <p>Restrict Merchant</p>
                          </div>
                        }
                        trigger="click"
                        open={mrtOpen === key}
                        onOpenChange={() => mrtHandleOpenChange(key)}
                      >
                        {t(
                          "collectionManagement.bankCardManagement.restrictMerchant"
                        )}
                      </Popover>
                      </button>
                      <button className="underline text-sm mb-2 text-primary block">
                      <Popover
                        content={popUpQr}
                        placement="left"
                        title={
                          <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                            <p>Payment QR code</p>
                          </div>
                        }
                        trigger="click"
                        open={qrOpen === key}
                        onOpenChange={() => mrtQrOpenChange(key)}
                      >
                        {t(
                          "collectionManagement.bankCardManagement.paymentQrCode"
                        )}
                      </Popover>
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="ml-2 block text-white bg-primary border border-primary p-[5px_20px] rounded-md dark:bg-grey-dark"
                        onClick={() => onClickEditHandler(collection)}
                      >
                        {isEdit
                          ? t("collectionManagement.bankCardManagement.save")
                          : t("collectionManagement.bankCardManagement.edit")}
                      </button>
                      <button
                        className={`ml-2 block border border-grey mt-2 p-[5px_20px] rounded-md dark:bg-grey-dark ${
                          isEdit
                            ? "bg-white text-tableHoverColor"
                            : "text-white bg-primary"
                        }`}
                        onClick={() => onClickDeleteCollection(collection?._id)}
                      >
                        {isEdit
                          ? t("collectionManagement.bankCardManagement.cancel")
                          : t("collectionManagement.bankCardManagement.delete")}
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="underline text-xsm mb-2 text-primary block">
                    {t("collectionManagement.bankCardManagement.noRecords")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-end mt-4">
        <ul class="flex text-primary text-sm">
          <li class="ml-1">
            <a
              href="#"
              class="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white"
            >
              {"<"}
            </a>
          </li>
          <li>
            <a
              href="#"
              class="px-2 rounded text-white bg-primary  dark:bg-grey-dark"
            >
              1
            </a>
          </li>
          {/* <li>
            <a href="#" class="px-2 rounded text-grey">
              •••
            </a>
          </li> */}
          <li class="ml-1">
            <a
              href="#"
              class="ml-1 px-2 rounded dark:bg-grey-dark dark:text-white"
            >
              {">"}
            </a>
          </li>
        </ul>
        <select className="ml-5 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
          <option value="10" selected>
            10 {t("collectionManagement.bankCardManagement.itemsPage")}
          </option>
          <option value="30">
            30 {t("collectionManagement.bankCardManagement.itemsPage")}
          </option>
          <option value="50">
            50 {t("collectionManagement.bankCardManagement.itemsPage")}
          </option>
          <option value="100">
            100 {t("collectionManagement.bankCardManagement.itemsPage")}
          </option>
        </select>
      </div>
      <MerchantModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal()}
        name={modalName}
        setModalName={setModalName}
        data={newPayment}
        setData={setNewPayment}
        onClickHandlers={{
          removeLabel: onClickDeleteLabelHandler,
          addLabel: onClickAddLabelHandler,
          addPayment: onClickAddNewPayment,
        }}
      />
    </>
  );
};
